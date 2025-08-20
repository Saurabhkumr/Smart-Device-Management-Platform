import {
  registerDeviceService,
  listDevicesService,
  updateDeviceService,
  deleteDeviceService,
  heartbeatDeviceService
} from "../services/device.service.js";

// Register new device
export const registerDevice = async (req, res) => {
  try {
    const device = await registerDeviceService(req.body, req.user?.id || null);
    res.status(201).json({ success: true, device });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// List devices
export const listDevices = async (req, res) => {
  try {
    const devices = await listDevicesService(req.query);
    res.json({ success: true, devices });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update device
export const updateDevice = async (req, res) => {
  try {
    const device = await updateDeviceService(req.params.id, req.body);
    res.json({ success: true, device });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete device
export const deleteDevice = async (req, res) => {
  try {
    await deleteDeviceService(req.params.id);
    res.json({ success: true, message: "Device deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Heartbeat device
export const heartbeatDevice = async (req, res) => {
  try {
    const result = await heartbeatDeviceService(req.params.id, req.body.status);
    res.json({ success: true, message: "Device heartbeat recorded", ...result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
