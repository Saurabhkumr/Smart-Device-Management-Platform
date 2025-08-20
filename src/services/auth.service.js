import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { insertUser, findUserByEmail } from "../models/user.model.js";

export const signupUser = async ({ name, email, password, role }) => {

  const existing = await findUserByEmail(email);
  if (existing) throw new Error("User already exists with this email");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await insertUser({ name, email, password: hashedPassword, role });
  return user;
};

export const login = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  };
};
