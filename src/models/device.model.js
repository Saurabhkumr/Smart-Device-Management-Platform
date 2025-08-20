import pool from "../config/db.js";

// Insert device
export const insertDevice = async ({ name, type, status, owner_id }) => {
  const query = `
    INSERT INTO devices (name, type, status, owner_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const result = await pool.query(query, [
    name,
    type,
    status || "inactive",
    owner_id,
  ]);
  return result.rows[0];
};

// Fetch devices with optional filters
export const fetchDevices = async ({ type, status }) => {
  const query = `
    SELECT * 
    FROM devices
    WHERE ($1::text IS NULL OR type ILIKE '%' || $1 || '%')
      AND ($2::text IS NULL OR status::text ILIKE '%' || $2 || '%');
  `;

  const values = [type || null, status || null];
  const result = await pool.query(query, values);
  return result.rows;
};

// Update device

export const updateDeviceById = async (id, updates) => {
  const keys = Object.keys(updates);
  if (keys.length === 0) throw new Error("No fields provided to update");

  const fields = keys.map((key, index) => `${key} = $${index + 1}`);
  const values = Object.values(updates);

  // Add id as the last parameter
  values.push(id);
  const query = `
    UPDATE devices
    SET ${fields.join(", ")}
    WHERE id = $${values.length}
    RETURNING *;
  `;

  const result = await pool.query(query, values);
  return result.rows[0];
};

// Delete device
export const deleteDeviceById = async (id) => {
  await pool.query("DELETE FROM devices WHERE id = $1", [id]);
};
export const updateHeartbeat = async (id, status) => {
  const query = `
    UPDATE devices
    SET status = $2,
        last_active_at = NOW()
    WHERE id = $1
    RETURNING last_active_at;
  `;

  const result = await pool.query(query, [id, status]);

  if (result.rowCount === 0) {
    throw new Error("Device not found");
  }

  return { last_active_at: result.rows[0].last_active_at };
};
