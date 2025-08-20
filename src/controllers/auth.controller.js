import { signupUser } from "../services/auth.service.js";

export const signup = async (req, res, next) => {
  try {
    const user = await signupUser(req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
};