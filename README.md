# Expense Tracker Backend

A Node.js/Express backend for managing personal finances with income and expense tracking.

## Features
- User authentication (register/login/logout)
- Income and expense management (CRUD operations)
- Excel export functionality
- Dashboard analytics
- Image upload capability
- MongoDB database
- JWT authentication

## Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file with the following variables:
```
MONGO_URL=your_mongodb_connection_string
PORT=5000
CLIENT_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret_key
```

## Available Scripts
- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login existing user
- `GET /api/v1/auth/getUser` - Get current user info (protected)
- `GET /api/v1/auth/logout` - Logout user
- `POST /api/v1/auth/upload-image` - Upload profile image

### Income
- `POST /api/v1/income/add` - Add new income (protected)
- `GET /api/v1/income/get` - Get all income (protected)
- `PUT /api/v1/income/:id` - Update income (protected)
- `DELETE /api/v1/income/:id` - Delete income (protected)
- `GET /api/v1/income/downloadexcel` - Export income to Excel (protected)

### Expense
- `POST /api/v1/expense/add` - Add new expense (protected)
- `GET /api/v1/expense/get` - Get all expenses (protected)
- `PUT /api/v1/expense/:id` - Update expense (protected)
- `DELETE /api/v1/expense/:id` - Delete expense (protected)
- `GET /api/v1/expense/downloadexcel` - Export expenses to Excel (protected)

### Dashboard
- `GET /api/v1/dashboard` - Get dashboard analytics (protected)

## Dependencies
- Express.js
- Mongoose (MongoDB)
- JSON Web Tokens
- Multer (file uploads)
- bcryptjs (password hashing)
- xlsx (Excel export)
- cors
- dotenv

## File Structure
```
backend/
├── config/        # Database configuration
├── controller/    # Business logic
├── middleware/    # Authentication and upload middlewares
├── models/        # MongoDB models
├── routes/        # API routes
├── uploads/       # Uploaded files
├── server.js      # Main application file
└── package.json   # Dependencies and scripts
