const router = require("express").Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ msg: "Access denied" });
    const task = await Task.create(req.body);
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Error creating task" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    let tasks;
    if (req.user.role === "admin") {
      tasks = await Task.find().populate("assignedTo", "name email").populate("project", "name");
    } else {
      tasks = await Task.find({ assignedTo: req.user.id }).populate("assignedTo", "name email").populate("project", "name");
    }
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/project/:projectId", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId }).populate("assignedTo", "name email").populate("project", "name");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    if (req.user.role === "admin") {
      const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedTask);
    } else {
      if (task.assignedTo.toString() !== req.user.id) {
        return res.status(403).json({ msg: "Access denied" });
      }
      task.status = req.body.status || task.status;
      await task.save();
      res.json(task);
    }
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ msg: "Access denied" });
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: "Task removed" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;