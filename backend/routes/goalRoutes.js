const express = require("express");
const router = express.Router();
const goalController = require("../controllers/goalControllers");

const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, goalController.getGoals)
  .post(protect, goalController.setGoals);
router
  .route("/:id")
  .delete(protect, goalController.deleteGoals)
  .put(protect, goalController.updateGoals);

module.exports = router;
