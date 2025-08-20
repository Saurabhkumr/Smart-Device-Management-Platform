import {
  insertDevice,
  fetchDevices,
  updateDeviceById,
  deleteDeviceById,

} from "../models/device.model.js";

// Register device
export const registerDeviceService = async (data, ownerId) => {
  return await insertDevice({ ...data, owner_id: ownerId });
};

// List devices with filters
export const listDevicesService = async (filters) => {
  return await fetchDevices(filters);
};

// Update device
export const updateDeviceService = async (id, updates) => {
  return await updateDeviceById(id, updates);
};

// Delete device
export const deleteDeviceService = async (id) => {
  return await deleteDeviceById(id);
};