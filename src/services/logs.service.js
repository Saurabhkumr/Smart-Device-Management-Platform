import {
  createLogEntry,
  fetchLastLogs,
  fetchAggregatedUsage,
} from "../models/logs.models.js";

export const createLogService = async (deviceId, data) => {
  const { event, value } = data;
  return await createLogEntry(deviceId, event, value);
};

export const getLastLogsService = async (deviceId, limit) => {
  return await fetchLastLogs(deviceId, limit);
};

export const getAggregatedUsageService = async (deviceId, range) => {
  return await fetchAggregatedUsage(deviceId, range);
};
