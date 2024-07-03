const express = require("express");
const mongoose = require("mongoose");
const Workout = require("../models/workoutModel");

module.exports.getAllWorkout = async (req, res) => {
  const user_id = req.user._id;
  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

module.exports.getSingleWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "workout not found" });
  }
  const workouts = await Workout.findOne({ _id: id, user_id: req.user._id });
  if (!workouts) {
    return res.status(404).json({ error: "workout not found" });
  }
  res.status(200).json(workouts);
};

module.exports.addNewWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  try {
    const user_id = req.user._id;

    const workout = await Workout.create({ title, reps, load, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

module.exports.editWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "workout not found" });
  }
  const workouts = await Workout.findOneAndUpdate(
    { _id: id, user_id: req.user._id },
    { ...req.body }
  );
  if (!workouts) {
    return res.status(404).json({ error: "No workout found" });
  }
  res.status(200).json(workouts);
};

module.exports.deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "workout not found" });
  }
  const workouts = await Workout.findOneAndDelete({
    _id: id,
    user_id: req.user._id,
  });
  if (!workouts) {
    return res.status(404).json({ error: "No workout found" });
  }
  res.status(200).json({ success: "workout deleted successfully" });
};
