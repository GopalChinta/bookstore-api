const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");

const {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");


// Secure all book routes
router.use(authenticate);

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", addBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;



