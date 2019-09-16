import { signup, login } from "./authController";

async function routes(fastify) {
  fastify.route({
    method: "POST",
    url: "/auth/signup",
    schema: {
      body: {
        type: "object",
        properties: {
          email: { type: "string" },
          username: { type: "string" },
          password: {
            type: "string"
          }
        },
        required: ["email", "username", "password"]
      }
    },
    handler: async function(request, reply) {
      const { email, username, password } = request.body;
      const data = await signup(email, username, password);

      reply.send(data);
    }
  });
  fastify.route({
    method: "POST",
    url: "/auth/login",
    schema: {
      body: {
        type: "object",
        properties: {
          email: { type: "string" },
          password: {
            type: "string"
          }
        },
        required: ["email", "password"]
      }
    },
    handler: async function(request, reply) {
      const { email, password } = request.body;
      const data = await login(email, password);

      reply.send(data);
    }
  });
}

export default routes;
