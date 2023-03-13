import { FastifyPluginCallback } from "fastify";

type PostsRoutesOpts = {};
export const postsRoutes: FastifyPluginCallback<PostsRoutesOpts> = (
  fastify,
  options,
  done
) => {
  done();
};
