import { FastifyPluginCallback } from "fastify";
import { createUser, findUserByEmail } from "../users/handlers.js";
import { CreateUser } from "../users/types.js";
import { generatePasswordHash, matchPassword } from "./handlers.js";
import { Login } from "./types.js";

type AuthRoutes = {};

export const authRoutes: FastifyPluginCallback<AuthRoutes> = (
  fastify,
  options,
  done
) => {
  fastify.post<{ Body: Login }>("/login", async (req, res) => {
    const { email, password } = req.body;
    const { data: user, error } = await findUserByEmail(email);
    if (!user) {
      res.status(403).send({
        error: "User not found",
        additionalInfo: "No user with such email found",
      });
    }
    if (error) {
      res.status(500).send({ error: "Internal server error" });
    }
    if (user) {
      const isMatched = await matchPassword(password, user.password);
      if (isMatched) {
        const token = fastify.jwt.sign({ id: user.id, role: user.role });
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          expires: new Date(new Date().getTime() + 60 * 60 * 24 * 30),
        });
        res.send(user);
      }
      if (!isMatched) {
        res.status(403).send({ error: "Incorrect email or password" });
      }
    }
  });

  fastify.post<{
    Body: CreateUser;
  }>("/register", async (req, res) => {
    const { name, email, password, role } = req.body;
    const { data: user, error: error_kek } = await findUserByEmail(email);
    if (user) {
      res.status(409).send({
        error: "User already exists",
        additionalInfo: "This email address is already registered",
      });
    }
    const hashedPw = await generatePasswordHash(password);
    const { data, error } = await createUser({
      name,
      email,
      password: hashedPw,
      role,
    });

    if (error) {
      console.log(error);
      res.status(500).send({ error: "Internal server error" });
    }

    if (data) {
      res.status(200).send(data);
    }
  });
  done();
};
