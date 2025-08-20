import pool from "../config/db.js";

const createTables = async () => {
  try {
    // Enum for user role
    await pool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
          CREATE TYPE user_role AS ENUM ('user', 'admin');
        END IF;
      END$$;
    `);

    // Enum for device status
    await pool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'device_status') THEN
          CREATE TYPE device_status AS ENUM ('active', 'inactive');
        END IF;
      END$$;
    `);

    // Users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role user_role DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Devices table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS devices (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL,
        type VARCHAR(50) NOT NULL,
        status device_status DEFAULT 'inactive',
        last_active_at TIMESTAMP,
        owner_id uuid NOT NULL REFERENCES users(id) ,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Device Logs table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS device_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        device_id uuid NOT NULL REFERENCES devices(id),
        event VARCHAR(100) NOT NULL,
        value NUMERIC(10,2),
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("All tables created successfully!");
  } catch (err) {
    console.error("Error creating tables:", err);
  }
};

export default createTables;
