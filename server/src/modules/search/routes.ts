import { FastifyPluginCallback } from "fastify";
import { searchUser } from "../users/handlers.js";
import { SearchQuery } from "./types.js";

type SearchOpts = {};

export const searchHandle: FastifyPluginCallback<SearchOpts> = (
  fastify,
  options,
  done
) => {
  fastify.get<{ Querystring: SearchQuery }>("/search", async (req, res) => {
    const { query } = req.query;
    const { data: foundUsers, error } = await searchUser(query);
    res.status(200).send(foundUsers);
  });
  done();
};
