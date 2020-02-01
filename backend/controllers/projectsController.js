const { validationResult } = require("express-validator");

const Project = require("../models/Project");

exports.getUserProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.userId });
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.createProject = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name } = req.body;

    const project = new Project({
      name,
      user: req.userId
    });

    await project.save();
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: "Project not found" });

    if (project.user.toString() !== req.userId)
      return res
        .status(401)
        .json({ msg: "You dont have permission to delete this project" });

    await project.remove();
    res.json({ msg: "Project removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.updateProject = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const project = await Project.findById(req.params.id);
    if (!project)
      return res.status(404).json({ errors: [{ msg: "Project not found" }] });

    if (project.user.toString() !== req.userId)
      return res
        .status(401)
        .json({
          errors: [{ msg: "You dont have permission to update this project" }]
        });

    project.name = req.body.name;
    await project.save;

    res.json(project);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      return res.status(404).json({ errors: [{ msg: "Project not found" }] });
    res.status(500).send("Server Error");
  }
};
