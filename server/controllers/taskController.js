import Task from "../models/Task.js";

// ADD TASK
export const addTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET TASKS BY EVENT
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ eventId: req.params.eventId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// TOGGLE TASK
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    task.status = task.status === "pending" ? "done" : "pending";
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};