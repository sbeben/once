import { FastifyPluginCallback } from "fastify";
import { jwtAuth } from "../auth/handlers.js";
import { findUserById } from "../users/handlers.js";
import { ProfileParams } from "./types.js";

type ProfileRoutesOpts = {};

export const profileRoutes: FastifyPluginCallback<ProfileRoutesOpts> = (
  fastify,
  options,
  done
) => {
  fastify.get<{ Params: ProfileParams }>(
    "/profile/:id",
    { preValidation: jwtAuth },
    async (req, res) => {
      const { id } = req.params;
      const userId = id === "me" ? req.user.id : id;
      const { data: profile } = await findUserById(userId);
      if (profile) {
        const { password, ...rest } = profile;
        res.status(200).send({ user: rest });
      }
      if (!profile) {
        res
          .status(500)
          .send({ message: "Internal server error", additionalInfo: "" });
      }
    }
  );

  done();
};
