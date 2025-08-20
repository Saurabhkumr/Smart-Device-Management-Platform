import cron from "node-cron";
import pool from "../config/db.js";

export const deactivateInactiveDevices = async () => {
  try {
    const result = await pool.query(`
      UPDATE devices
      SET status = 'inactive'
      WHERE last_active_at IS NULL 
         OR last_active_at < NOW() - INTERVAL '24 hours'
         AND status = 'active'
      RETURNING id, name;
    `);

    if (result.rowCount > 0) {
      console.log(`Deactivated ${result.rowCount} devices:`, result.rows);
    } else {
      console.log("No devices to deactivate.");
    }
  } catch (err) {
    console.error("Error deactivating devices:", err.message);
  }
};


export const scheduleDeviceDeactivation = () => {
  cron.schedule("0 * * * *", async () => {
    console.log("Running device deactivation job...");
    await deactivateInactiveDevices();
  });
};
