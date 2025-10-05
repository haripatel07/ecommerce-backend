# E-commerce Backend

## Overview
This is a scalable and secure backend for an online store, built with Node.js, Express.js, MongoDB, JWT authentication, and Stripe payments.

## Features
- Product catalog management (CRUD)
- Order processing and tracking
- Stripe payment gateway integration
- User authentication and authorization (JWT)
- Input validation and error handling
- Logging and monitoring
- API documentation (Swagger)

## Setup Instructions
1. Clone the repository
2. Install dependencies:
	```bash
	npm install
	```
3. Copy `.env.example` to `.env` and fill in your environment variables:
	- `PORT`
	- `MONGO_URI`
	- `JWT_SECRET`
	- `STRIPE_SECRET_KEY`
	- `STRIPE_WEBHOOK_SECRET`
	- `NODE_ENV`
4. Start the server:
	```bash
	npm run dev
	```

## API Documentation
See [swagger.yaml](./swagger.yaml) for OpenAPI documentation. You can use Swagger UI to visualize and test endpoints.

## Health Check
`GET /api/health` returns server status and uptime.

## License
MIT