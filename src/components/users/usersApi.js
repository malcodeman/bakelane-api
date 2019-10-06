import usersDAL from "./usersDAL";
import { requireAuthentication } from "../auth/authMiddleware";

async function routes(fastify) {
  fastify.route({
    method: "GET",
    url: "/myself",
    schema: {
      headers: {
        type: "object",
        properties: {
          authorization: { type: "string" }
        },
        required: ["authorization"]
      },
      response: {
        200: {
          type: "object",
          properties: {
            id: { type: "number" },
            email: { type: "string" },
            username: { type: "string" },
            createdAt: { type: "string" }
          }
        }
      }
    },
    preHandler: function(request, reply, done) {
      try {
        const userId = requireAuthentication(request.headers);

        request.userId = userId;
        done();
      } catch (error) {
        reply.code(401).send(error);
      }
    },
    handler: async function(request, reply) {
      const data = await usersDAL.findById(request.userId);

      reply.send(data);
    }
  }),
    fastify.route({
      method: "GET",
      url: "/users/:username",
      schema: {
        params: {
          type: "object",
          properties: {
            username: { type: "string" }
          },
          required: ["username"]
        },
        response: {
          200: {
            type: "object",
            properties: {
              id: { type: "number" },
              username: { type: "string" },
              createdAt: { type: "string" }
            }
          }
        }
      },
      handler: async function(request, reply) {
        const { username } = request.params;
        const data = await usersDAL.findByUsername(username);

        if (!data) {
          throw new Error("UserNotFoundException");
        }
        reply.send(data);
      }
    });
}

export default routes;
