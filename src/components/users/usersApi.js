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
      method: "PUT",
      url: "/myself/updateEmail",
      schema: {
        body: {
          type: "object",
          properties: {
            email: { type: "string" }
          },
          required: ["email"]
        },
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
              email: { type: "string" }
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
        const { email } = request.body;
        const data = await usersDAL.updateEmail(request.userId, email);

        reply.send(data);
      }
    }),
    fastify.route({
      method: "PUT",
      url: "/myself/updateUsername",
      schema: {
        body: {
          type: "object",
          properties: {
            username: { type: "string" }
          },
          required: ["username"]
        },
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
              username: { type: "string" }
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
        const { username } = request.body;
        const data = await usersDAL.updateUsername(request.userId, username);

        reply.send(data);
      }
    }),
    fastify.route({
      method: "PUT",
      url: "/myself/updatePassword",
      schema: {
        body: {
          type: "object",
          properties: {
            currentPassword: { type: "string" },
            newPassword: { type: "string" },
            confirmPassword: { type: "string" }
          },
          required: ["currentPassword", "newPassword", "confirmPassword"]
        },
        headers: {
          type: "object",
          properties: {
            authorization: { type: "string" }
          },
          required: ["authorization"]
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
        const { currentPassword, newPassword, confirmPassword } = request.body;
        const data = await usersDAL.updatePassword(
          request.userId,
          currentPassword,
          newPassword,
          confirmPassword
        );

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
