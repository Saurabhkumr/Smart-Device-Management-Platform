import express from "express";
import { verifyToken } from "../middlewares/verifyUser.js";
import {
  registerDevice,
  listDevices,
  updateDevice
} from "../controllers/device.controller.js";

const router = express.Router();

router.post("/", verifyToken, registerDevice);
router.get("/", verifyToken, listDevices);
router.put("/:id", verifyToken, updateDevice);
// router.delete("/:id", deleteDevice);
// router.post("/:id/heartbeat", heartbeatDevice);

export default router;
