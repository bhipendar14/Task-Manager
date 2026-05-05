const router = require("express").Router();
const Project = require("../models/Project");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ msg: "Access denied" });
    const project = await Project.create({ ...req.body, createdBy: req.user.id });
    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: "Error creating project" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    let projects;
    if (req.user.role === "admin") {
      projects = await Project.find().populate("members", "name email");
    } else {
      projects = await Project.find({ members: req.user.id }).populate("members", "name email");
    }
    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("members", "name email");
    if (!project) return res.status(404).json({ msg: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;