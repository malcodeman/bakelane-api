import fastify from "fastify";
import cors from "fastify-cors";

import auth from "./components/auth/authApi";
import orders from "./components/orders/ordersApi";

const app = fastify({ logger: true });

app.register(cors);
app.register(auth);
app.register(orders);

export default app;
