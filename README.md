# 📚 Bookstore API

A simple RESTful API for user registration, login, and book management, built with Node.js, Express, and JWT authentication.

## 🔧 Features

- User registration & login (with hashed passwords using bcrypt)
- JWT-based authentication
- Protected routes for managing books
- File-based JSON persistence
- Modular code structure: routes, controllers, middleware
- Error handling and route protection
- Tested with Postman

---

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/GopalChinta/bookstore-api.git
   cd bookstore-api
Install dependencies

npm install
Create .env file

env

PORT=3000
JWT_SECRET=your_jwt_secret_key_here
Run the server


npx nodemon server.js
Or


node server.js
🔐 Authentication
All protected routes require a Bearer token. After login, pass the token in headers like:
Authorization: Bearer <your_token_here>
📬 API Endpoints
Auth Routes
Method	Route	Description
POST	/register	Register a new user
POST	/login	Login a user

Book Routes (Protected)
Method	Route	Description
GET	/books	Get all books
POST	/books	Add a new book
PUT	/books/:id	Update book by ID
DELETE	/books/:id	Delete book by ID

📁 Project Structure

bookstore-api/
├── controllers/
│   ├── authController.js
│   └── bookController.js
├── data/
│   ├── books.json
│   └── users.json
├── middleware/
│   ├── authMiddleware.js
│   └── errorHandler.js
├── routes/
│   ├── authRoutes.js
│   └── bookRoutes.js
├── .env
├── server.js
└── package.json

Dependencies

express
dotenv
bcrypt
jsonwebtoken
morgan
uuid



Author
Gopal Chinta
GitHub • LinkedIn

📄 License
This project is licensed under the MIT License.













 
 
