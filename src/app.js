import fastify from "fastify";
import cors from "fastify-cors";

import auth from "./components/auth/authApi";
import orders from "./components/orders/ordersApi";
import users from "./components/users/usersApi";

const app = fastify({ logger: true });

app.register(cors);
app.register(auth);
app.register(orders);
app.register(users);

export default app;
