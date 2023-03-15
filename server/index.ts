import * as dotenv from "dotenv";
dotenv.config();
import Fastify, { FastifyInstance } from "fastify";
import cookie from "@fastify/cookie";
import session from "@fastify/session";
import websocket from "@fastify/websocket";
import cors from "@fastify/cors";
import fastifyJWT from "@fastify/jwt";
import fastifyAuth from "@fastify/auth";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { createClient } from "@supabase/supabase-js";

import { authRoutes } from "./src/modules/auth/routes.js";
import { wsHandler } from "./src/modules/conversations/routes.js";
import { searchHandle } from "./src/modules/search/routes.js";
import { profileRoutes } from "./src/modules/profile/routes.js";
import { errorHandler } from "./src/modules/error/index.js";
import { jwtAuth } from "./src/modules/auth/handlers.js";

export const db = createClient(
  process.env.DB_URL || "",
  process.env.DB_KEY || ""
);

const fastify: FastifyInstance = Fastify({
  logger: true,
});
fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

fastify.register(fastifyAuth);
fastify.register(fastifyJWT, {
  secret: process.env.JWT_SECRET || "", // use a secure key for signing the JWT
});
// fastify.decorate(
//   "authenticate",
//   async (req: FastifyRequest, res: FastifyReply) => {
//     try {
//       await req.jwtVerify();
//     } catch (err) {
//       res.send(err);
//     }
//   }
// );

fastify.register(cookie);
// fastify.register(session, {
//   secret: "secret",
//   cookie: {
//     path: "/",
//     maxAge: 2629800000,
//     secure: false,
//   },
// });
fastify.register(cors, {
  origin: "http://localhost:3000",
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Access-Control-Allow-Credentials",
    "Access-Control-Allow-Origin",
  ],
  exposedHeaders: ["Authorization"],
  credentials: true,
  // maxAge: 86400
});

fastify.register(authRoutes);
fastify.register(profileRoutes);

fastify.register(websocket, { options: { clientTracking: true } });
fastify.register(wsHandler);

fastify.register(searchHandle);

fastify.setErrorHandler(errorHandler);
// host: '0.0.0.0' after port
fastify.listen(
  { port: parseInt(process.env.PORT || "3001") },
  function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    // Server is now listening on ${address}
  }
);
