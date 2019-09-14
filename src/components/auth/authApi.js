import { signup, login } from "./authController";

async function routes(fastify) {
  fastify.route({
    method: "POST",
    url: "/auth/signup",
    handler: async function(request, reply) {
      const data = await signup();

      reply.send(data);
    }
  });
  fastify.route({
    method: "POST",
    url: "/auth/login",
    handler: async function(request, reply) {
      const data = await login();

      reply.send(data);
    }
  });
}

export default routes;
