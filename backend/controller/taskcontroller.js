import Task from "../models/task.js";

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = await Task.create({
      title,
      description,
      createdBy: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error("❌ Error creating task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("createdBy", "name email");
    res.json(tasks);
  } catch (error) {
    console.error("❌ Error fetching tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.title = title || task.title;
    task.description = description || task.description;
    task.completed = completed ?? task.completed;

    const updated = await task.save();
    res.json(updated);
  } catch (error) {
    console.error("❌ Error updating task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted" });
  } catch (error) {
    console.error("❌ Error deleting task:", error);
    res.status(500).json({ message: "Server error" });
  }
};
