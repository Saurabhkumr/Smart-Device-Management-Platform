# Smart Device Management Platform

A comprehensive platform for managing IoT devices, enabling device registration, heartbeat monitoring, log tracking, and usage analytics.

## 🚀 Features

* **Device Registration**: Register new devices with attributes like name, type, and status.
* **Device Monitoring**: Update device status and last active time.
* **Log Management**: Create and retrieve device logs.
* **Usage Analytics**: Fetch aggregated device usage data over specified time ranges.
* **User Authentication**: Sign up and sign in with JWT-based authentication.

## 🛠️ Tech Stack

* **Backend**: Node.js, Express.js
* **Database**: PostgreSQL
* **Authentication**: JWT (JSON Web Tokens)
* **ORM**: Custom SQL queries
* **Environment Variables**: dotenv for configuration management

## 🛠️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/Saurabhkumr/Smart-Device-Management-Platform.git
cd Smart-Device-Management-Platform
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add the following:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
```

### 4. Run the application

```bash
npm start
```

The application will be running on `http://localhost:3000`.

## 🧪 API Endpoints

### User Management

* `POST /auth/signup`: Create a new account.
* `POST /auth/signin`: Login with email and password, returns JWT.

### Device Management

* `POST /devices`: Register a new device.
* `GET /devices`: List devices (filter by type, status).
* `PATCH /devices/:id`: Update device details.
* `DELETE /devices/:id`: Remove a device.
* `POST /devices/:id/heartbeat`: Update last active timestamp.

### Data & Analytics

* `POST /devices/:id/logs`: Create a new log entry.
* `GET /devices/:id/logs`: Fetch device logs (supports pagination).
* `GET /devices/:id/usage`: Fetch aggregated device usage data.

## 🛠️ Running with Docker

To run the application using Docker:

1. Build the Docker image:

```bash
docker build -t smart-device-management .
```

2. Run the application:

```bash
docker run -p 3000:3000 --env-file .env smart-device-management
```

