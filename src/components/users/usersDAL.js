import User from "./usersModel";

export async function create(email, username, password) {
  const user = await User.create({ email, username, password });

  return user;
}

export async function findByEmail(email) {
  const user = await User.findOne({
    where: {
      email
    }
  });

  return user;
}

export async function findByUsername(username) {
  const user = await User.findOne({
    where: {
      username
    }
  });

  return user;
}

export async function findById(id) {
  const user = await User.findOne({
    where: {
      id
    }
  });

  return user;
}

export async function updateEmail(id, email) {
  if (await findByEmail(email)) {
    throw new Error("EmailExistsException");
  }
  const user = await User.update(
    { email },
    {
      where: {
        id
      }
    }
  );

  return { email };
}

export async function updateUsername(id, username) {
  if (await findByUsername(username)) {
    throw new Error("UsernameExistsException");
  }
  const user = await User.update(
    { username },
    {
      where: {
        id
      }
    }
  );

  return { username };
}

export default {
  create,
  findByEmail,
  findByUsername,
  findById,
  updateEmail,
  updateUsername
};
