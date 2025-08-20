import express from "express";
import { signup, signin } from "../controllers/user.controller.js";
import { registerUserSchema } from "../schema/user.schema.js";
import { validateBody } from "../middlewares/validate.js";

const router = express.Router();

router.post("/signup", validateBody(registerUserSchema), signup);
router.post("/signin", signin);

export default router;

