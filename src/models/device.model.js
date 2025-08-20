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
export const updateDeviceById = async (id, { name, type, status }) => {
  const query = `
    UPDATE devices
    SET name = $2,type=$3, status = $4
    WHERE id = $1
    RETURNING *;
  `;
  const result = await pool.query(query, [id, name, type, status]);
  return result.rows[0];
};

// Delete device
export const deleteDeviceById = async (id) => {
  await pool.query("DELETE FROM devices WHERE id = $1", [id]);
};
