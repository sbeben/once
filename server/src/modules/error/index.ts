import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { ZodError } from "zod";

export const ErrorSchema = z.object({
  error: z.string(),
  additionalInfo: z.string(),
});

export const errorHandler = (
  err: FastifyError,
  req: FastifyRequest,
  res: FastifyReply
) => {
  if (err instanceof ZodError) {
    console.log("Validation error", JSON.parse(err.message));
    const error = JSON.parse(err.message)[0];
    res.status(400).send({
      error: "Validation error",
      additionalInfo: error.message,
    });
  }
};
