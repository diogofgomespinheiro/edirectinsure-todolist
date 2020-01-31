const { validationResult } = require("express-validator");

const Project = require("../models/Project");

exports.GetUserProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.userId });
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.CreateProject = async (req, res) => {
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
