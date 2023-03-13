import bcrypt from "bcrypt";
import { preValidationHookHandler } from "fastify";

export const generatePasswordHash = async (
  password: string
): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};

export const matchPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const isMatched = bcrypt.compare(password, hashedPassword);
  return isMatched;
};

export const jwtAuth: preValidationHookHandler = (request, res, next) => {
  //const token = request.headers.authorization.replace("Bearer ", "");
  if (request.headers.cookie) {
    try {
      const token = request.headers.cookie.replace("token=", "");
      if (token && typeof token === "string") {
        const user = request.server.jwt.verify(token);
        //const user = request.jwtVerify();
        request.user = user;
        next();
      }
    } catch (err) {
      res.status(401).send({ error: err });
    }
  }
  if (!request.headers.cookie)
    res.status(401).send({ message: "Unauthorized" });
};
