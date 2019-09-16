import argon from "argon2";
import jwt from "jsonwebtoken";

import usersDAL from "../users/usersDAL";
import { EXPIRES_IN } from "./authConstants";

const { PRIVATE_KEY } = process.env;

export async function signup(email, username, password) {
  if (await usersDAL.findByEmail(email)) {
    throw new Error("EmailExistsException");
  } else if (await usersDAL.findByUsername(username)) {
    throw new Error("UsernameExistsException");
  }
  const hash = await argon.hash(password);
  const user = await usersDAL.create(email, username, hash);
  const id = user.id;
  const token = jwt.sign({ id }, PRIVATE_KEY, {
    expiresIn: EXPIRES_IN
  });

  return {
    token,
    user: {
      id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt
    }
  };
}

export async function login(email, password) {
  const user = await usersDAL.findByEmail(email);

  if (user === null) {
    throw new Error("UserNotFoundException");
  }
  if (await argon.verify(user.password, password)) {
    const id = user.id;
    const token = jwt.sign({ id }, PRIVATE_KEY, {
      expiresIn: EXPIRES_IN
    });

    return {
      token,
      user: {
        id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt
      }
    };
  } else {
    throw new Error("NotAuthorizedException");
  }
}

export default {
  signup,
  login
};
