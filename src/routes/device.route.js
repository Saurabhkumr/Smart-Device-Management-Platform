import express from "express";
import {
  registerDevice,
  listDevices,
  updateDevice,
  deleteDevice,
  heartbeatDevice,
} from "../controllers/device.controller.js";

import {
  createLogController,
  getLastLogsController,
  getAggregatedUsageController,
} from "../controllers/logs.controller.js";

import {
  registerDeviceSchema,
  updateDeviceSchema,
} from "../schema/device.schema.js";
import { validateBody } from "../middlewares/validate.js";

const router = express.Router();

router.post("/", validateBody(registerDeviceSchema), registerDevice);
router.get("/", listDevices);
router.patch("/:id", validateBody(updateDeviceSchema), updateDevice);
router.delete("/:id", deleteDevice);
router.post("/:id/heartbeat", heartbeatDevice);

//Data & Analytics

router.post("/:id/logs", createLogController);
router.get("/:id/logs", getLastLogsController);
router.get("/:id/usage", getAggregatedUsageController);

export default router;
