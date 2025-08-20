import pool from "../config/db.js";

// Create log entry
export const createLogEntry = async (deviceId, event, value) => {
  const query = `
    INSERT INTO device_logs (device_id, event, value, timestamp)
    VALUES ($1, $2, $3, NOW())
    RETURNING *;
  `;
  const result = await pool.query(query, [deviceId, event, value]);
  return result.rows[0];
};

// Fetch last N logs
export const fetchLastLogs = async (deviceId, limit = 10) => {
  const query = `
    SELECT id, event, value, timestamp
    FROM device_logs
    WHERE device_id = $1
    ORDER BY timestamp DESC
    LIMIT $2;
  `;
  const result = await pool.query(query, [deviceId, limit]);
  return result.rows;
};

export const fetchAggregatedUsage = async (deviceId, range = "24h") => {

  let intervalStr = range.replace("h", " hours").replace("d", " days");

  const query = `
    SELECT device_id, SUM(value) AS total_units
    FROM device_logs
    WHERE device_id = $1
      AND timestamp >= NOW() - INTERVAL '${intervalStr}'
    GROUP BY device_id;
  `;

  const result = await pool.query(query, [deviceId]);
  return result.rows[0] || { device_id: deviceId, total_units: 0 };
};
