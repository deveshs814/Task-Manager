const task = require("../models/task");

const addTask = async (req, res) => {
  try {
    const { title, description, priority, status } = req.body;
    const { user } = req;
    if (!user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    if (!title || !description) {
      return res.status(400).json({ error: "All fields are required!!" });
    }
    if (title.length < 6) {
      return res
        .status(400)
        .json({ error: "Title must have atleast 6 characters" });
    }
    if (description.length < 6) {
      return res
        .status(400)
        .json({ error: "Description must have atleast 6 characters" });
    }

    const newTask = new task({ title, description, priority, status });
    await newTask.save();
    user.tasks.push(newTask._id);
    await user.save();
    return res.status(200).json({ success: "Task Added" });
  } catch (error) {
    return res.status(404).json({ error: "Internal server error" });
  }
};

const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, status } = req.body;
    if (!user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    // const { user } = req.user;
    if (!title || !description) {
      return res.status(400).json({ error: "All fields are required!!" });
    }
    if (title.length < 6) {
      return res
        .status(400)
        .json({ error: "Title must have atleast 6 characters" });
    }
    if (description.length < 6) {
      return res
        .status(400)
        .json({ error: "Description must have atleast 6 characters" });
    }

    await task.findByIdAndUpdate(id, { title, description, priority, status });
    return res.status(200).json({ success: "Task updated" });
  } catch (error) {
    return res.status(404).json({ error: "Internal server error" });
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const taskDetails = await task.findById(id);

    if (!taskDetails) {
      return res.status(404).json({ error: "No task found with that ID" });
    }

    return res.status(200).json({ taskDetails }); // ✅ SEND the actual task
  } catch (error) {
    console.error("Error in getTask:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await task.findByIdAndDelete(id);
    if (!user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    if (!deleted) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(200).json({ success: "Task Deleted" });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addTask, editTask, getTask, deleteTask };
