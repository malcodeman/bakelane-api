import Order from "./ordersModel";
import User from "../users/usersModel";

export async function create(title, description, userId) {
  const order = await Order.create({ title, description, userId });

  return order;
}

export async function findAll() {
  const orders = await Order.findAll({
    include: [
      {
        model: User,
        attributes: ["username"]
      }
    ]
  });

  return orders;
}

export default {
  create,
  findAll
};
