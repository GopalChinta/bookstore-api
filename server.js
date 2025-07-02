require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express(); // ✅ app is defined BEFORE use()

app.use(morgan("dev"));
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Bookstore API is running!");
});

// ✅ Middleware and routes must come AFTER app is defined
app.use("/", authRoutes);
app.use("/books", bookRoutes);



// Error handlers
app.use(notFound);
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


