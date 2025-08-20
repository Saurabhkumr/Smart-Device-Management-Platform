import {
  createLogService,
  getLastLogsService,
  getAggregatedUsageService,
} from "../services/logs.service.js";

export const createLogController = async (req, res) => {
  try {
    const deviceId = req.params.id;
    const log = await createLogService(deviceId, req.body);
    res.status(201).json({ success: true, log });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getLastLogsController = async (req, res) => {
  try {
    const deviceId = req.params.id;
    const limit = parseInt(req.query.limit) || 10;
    const logs = await getLastLogsService(deviceId, limit);
    res.json({ success: true, logs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAggregatedUsageController = async (req, res) => {
  try {
    const deviceId = req.params.id;
    const range = req.query.range || "24h";
    const usage = await getAggregatedUsageService(deviceId, range);
    res.json({
      success: true,
      device_id: usage.device_id,
      total_units_last_24h: parseFloat(usage.total_units),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
