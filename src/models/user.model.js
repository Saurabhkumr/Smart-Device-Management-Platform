import pool from "../config/db.js";

export const insertUser = async ({ name, email, password, role }) => {
  const query = `
    INSERT INTO users (name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, role;
  `;
  const values = [name, email, password, role || "user"];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Find user by email
export const findUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = $1";
  const result = await pool.query(query, [email]);
  return result.rows[0];
};
