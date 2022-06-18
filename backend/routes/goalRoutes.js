const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getGoals,
  setGoals,
  updatetGoals,
  deleteGoals,
} = require("../controllers/goalControllers");

// router.get("/", getGoals);
// router.post("/", setGoals);
// router.put("/", updatetGoals);
// router.delete("/", deleteGoals);

router.route("/").get(protect, getGoals).post(protect, setGoals);
router.route("/:id").put(protect, updatetGoals).delete(protect, deleteGoals);

module.exports = router;
