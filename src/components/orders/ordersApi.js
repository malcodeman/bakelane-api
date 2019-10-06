import { findAll, create } from "./ordersController";
import { requireAuthentication } from "../auth/authMiddleware";

async function routes(fastify) {
  fastify.route({
    method: "POST",
    url: "/orders",
    schema: {
      headers: {
        type: "object",
        properties: {
          authorization: { type: "string" }
        },
        required: ["authorization"]
      },
      body: {
        type: "object",
        properties: {
          title: { type: "string" },
          description: {
            type: "string"
          }
        },
        required: ["title", "description"]
      },
      response: {
        200: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" }
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
      const data = await create(request.body, request.userId);

      reply.send(data);
    }
  }),
    fastify.route({
      method: "GET",
      url: "/orders",
      handler: async function(request, reply) {
        const data = await findAll();

        reply.send(data);
      }
    });
}

export default routes;
