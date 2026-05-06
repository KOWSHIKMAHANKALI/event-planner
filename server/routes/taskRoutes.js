import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// ✅ GET ALL TASKS
router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// ✅ GET TASKS BY EVENT
router.get("/:eventId", async (req, res) => {
  try {
    const tasks = await Task.find({ eventId: req.params.eventId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ ADD TASK
router.post("/", async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
});

// ✅ UPDATE TASK
router.put("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);

  task.status = task.status === "pending" ? "done" : "pending";
  await task.save();

  res.json(task);
});

export default router;