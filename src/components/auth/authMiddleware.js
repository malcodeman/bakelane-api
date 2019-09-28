import jwt from "jsonwebtoken";

const { PRIVATE_KEY } = process.env;

export function requireAuthentication(header) {
  const auth = header.authorization;

  if (!auth) {
    throw Error("Missing authorization header");
  }
  if (!auth.startsWith("Bearer ")) {
    throw Error("Invalid token prefix, expected Bearer");
  }
  try {
    const token = auth.substring(7, auth.length);
    const decoded = jwt.verify(token, PRIVATE_KEY);

    return decoded.id;
  } catch {
    throw Error("Invalid JWT");
  }
}
