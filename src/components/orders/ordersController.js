import ordersDAL from "./ordersDAL";

export async function create(body, userId) {
  const { title, description } = body;
  const order = await ordersDAL.create(title, description, userId);

  return order;
}

export async function findAll() {
  const orders = await ordersDAL.findAll();

  return orders;
}
