import express from "express";
import { verifyToken } from "../middlewares/verifyUser.js";
import {
  registerDevice,
  listDevices,
  updateDevice,
  deleteDevice,
  heartbeatDevice,
} from "../controllers/device.controller.js";

const router = express.Router();

router.post("/", verifyToken, registerDevice);
router.get("/", verifyToken, listDevices);
router.patch("/:id", verifyToken, updateDevice);
router.delete("/:id", verifyToken, deleteDevice);
router.post("/:id/heartbeat", verifyToken, heartbeatDevice);

export default router;
