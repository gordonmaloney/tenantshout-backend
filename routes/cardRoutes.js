const express = require("express");
const router = express.Router();
const {
  getCards,
  createCard,
  updateCard,
  createCardsBulk,
  deleteCard,
  patchCard,
  bulkDelete
} = require("../controllers/cardsController");
const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, getCards)
router.post("/", protect, createCard);
router.post("/bulk", protect, createCardsBulk);
router.put("/", protect, updateCard);
router.delete("/", protect, deleteCard);
router.patch("/", protect, patchCard)
router.patch("/bulk", protect, bulkDelete)


module.exports = router;
