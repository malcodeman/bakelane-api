import User from "./usersModel";

export async function create(email, username, password) {
  const user = await User.create({ email, username, password });

  if (user) {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt
    };
  } else {
    throw new Error("CanNotCreateUserException");
  }
}

export default {
  create
};
