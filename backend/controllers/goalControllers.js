const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// @desc Getgoals
// @route GET/api/goals
// @access private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

// @desc Setgoals
// @route POST/api/goals
// @access private
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(404);
    throw new Error("Please enter a text first");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(goal);
});

// @desc Update goals
// @route PUT /api/goals
// @access private
const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(404);
    throw new Error("No goal found with this id ");
  }

  // const user = await User.findById(req.user.id);

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("user not found");
  }

  // Makes sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

// @desc Delete goals
// @route DELETE/api/goals
// @access private
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(404);
    throw new Error("No goal found with this id ");
  }

  // const user = await User.findById(req.user.id);

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("user not found");
  }

  // Makes sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await goal.remove();
  // const deleteGoal = await Goal.findByIdAndDelete(req.params.id);
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
};
