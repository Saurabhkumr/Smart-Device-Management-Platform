import { signupUser, signinUser } from "../services/user.service.js";

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

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password required" });
    }

    const result = await signinUser(req.body);

    res.status(200).json({
      success: true,
      message: "Signin successful",
      data: result,
    });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};
