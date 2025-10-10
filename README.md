# E-Commerce Backend API

A scalable and secure REST API for an e-commerce platform, built with Node.js, Express.js, and MongoDB. Features JWT authentication, Stripe payment integration, and comprehensive product and order management.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Product Management**: Complete CRUD operations for products with categories, pricing, stock, and image support
- **Order Processing**: Create and track orders with detailed item information and shipping addresses
- **Payment Integration**: Secure payment processing using Stripe API with webhook support
- **User Authentication**: JWT-based authentication with role-based access control (user/admin)
- **Input Validation**: Comprehensive validation for all API endpoints
- **Error Handling**: Centralized error handling with appropriate HTTP status codes
- **Logging**: Request logging using Morgan middleware
- **Health Monitoring**: Health check endpoint for system monitoring
- **API Documentation**: OpenAPI/Swagger documentation for all endpoints

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Payments**: Stripe API
- **Validation**: Custom validation middleware
- **Logging**: Morgan
- **Environment**: dotenv for configuration management

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)
- Stripe account for payment processing

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/haripatel07/ecommerce-backend.git
   cd ecommerce-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in the required values in `.env` (see [Environment Setup](#environment-setup))

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/ecommerce

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# Payment Processing
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### Environment Variables Description

- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment mode (development/production)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `STRIPE_SECRET_KEY`: Stripe secret key for payment processing
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook signing secret

## Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will start on the specified port (default: http://localhost:5000)

### Health Check
Visit `http://localhost:5000/api/health` to verify the server is running.

## API Documentation

The API is fully documented using OpenAPI 3.0 specification. View the documentation at:
- [swagger.yaml](./swagger.yaml) - OpenAPI specification file

### Key Endpoints

- `GET /api/products` - Get all products
- `POST /api/products` - Create product (Admin only)
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/orders` - Create order
- `POST /api/payments/create-payment-intent` - Create Stripe payment intent

## Project Structure

```
ecommerce-backend/
├── src/
│   ├── api/
│   │   ├── controllers/     # Request handlers
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API routes
│   │   └── middleware/     # Custom middleware
│   ├── config/            # Database configuration
│   └── utils/             # Utility functions
├── .env.example           # Environment template
├── swagger.yaml           # API documentation
├── package.json           # Dependencies and scripts
└── README.md             # Project documentation
```

## Testing

Run tests using:
```bash
npm test
```


## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

**Hari Patel**
- GitHub: [@haripatel07](https://github.com/haripatel07)
- Email: hari@example.com

---

*Built with ❤️ using Node.js and Express.js*