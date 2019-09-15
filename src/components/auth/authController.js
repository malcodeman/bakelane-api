import argon from "argon2";
import jwt from "jsonwebtoken";

import usersDAL from "../users/usersDAL";

const { PRIVATE_KEY } = process.env;

export async function signup(email, username, password) {
  try {
    const hash = await argon.hash(password);
    const user = await usersDAL.create(email, username, hash);
    const id = user.id;
    const token = jwt.sign({ id }, PRIVATE_KEY, {
      expiresIn: "20 days"
    });

    return { token, user };
  } catch (error) {
    throw error.message;
  }
}

export async function login() {
  return "login";
}

export default {
  signup,
  login
};
