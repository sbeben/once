import { FastifyPluginCallback } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { ErrorSchema } from "../error/index.js";
import { createUser, findUserByEmail } from "../users/handlers.js";
import { generatePasswordHash, matchPassword } from "./handlers.js";
import {
  LoginSchema,
  LoginSuccess,
  RegisterSchema,
  RegisterSuccess,
} from "./schemas.js";
//import { Login } from "./schemas.js";

type AuthRoutes = {};

export const authRoutes: FastifyPluginCallback<AuthRoutes> = (
  fastify,
  options,
  done
) => {
  fastify.withTypeProvider<ZodTypeProvider>().post(
    "/login",
    {
      schema: {
        body: LoginSchema,
        response: {
          200: LoginSuccess,
          403: ErrorSchema,
        },
      },
    },
    async (req, res) => {
      const { email, password } = req.body;
      const { data: user } = await findUserByEmail(email);
      if (!user) {
        res.status(403).send({
          error: "User not found",
          additionalInfo: "No user with such email found",
        });
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
          res
            .status(403)
            .send({ error: "Incorrect email or password", additionalInfo: "" });
        }
      }
    }
  );

  fastify.withTypeProvider<ZodTypeProvider>().post(
    "/register",
    {
      schema: {
        body: RegisterSchema,
        response: {
          200: RegisterSuccess,
          409: ErrorSchema,
        },
      },
    },
    async (req, res) => {
      const { name, email, password, role } = req.body;
      const { data: user } = await findUserByEmail(email);
      if (user) {
        res.status(409).send({
          error: "User already exists",
          additionalInfo: "This email address is already registered",
        });
      }
      const hashedPw = await generatePasswordHash(password);
      const { data } = await createUser({
        name,
        email,
        password: hashedPw,
        role,
      });
      if (data) {
        console.log(data);
        res.status(200).send(data);
      }
    }
  );
  done();
};
