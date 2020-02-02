const { validationResult } = require("express-validator");

const Project = require("../models/Project");

exports.getUserProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.userId }).sort({
      creation_date: -1
    });
    res.status(200).json(projects);
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
    res.status(200).json(project);
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
    res.status(200).json({ msg: "Project removed" });
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
      return res.status(401).json({
        errors: [{ msg: "You dont have permission to update this project" }]
      });

    project.name = req.body.name;
    await project.save();

    res.status(200).json(project);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      return res.status(404).json({ errors: [{ msg: "Project not found" }] });
    res.status(500).send("Server Error");
  }
};

exports.addTaskToProject = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const project = await Project.findById(req.params.id);
    if (!project)
      return res.status(404).json({ errors: [{ msg: "Project not found" }] });

    if (project.user.toString() !== req.userId)
      return res.status(401).json({
        errors: [
          { msg: "You dont have permission to add tasks to this project" }
        ]
      });

    project.tasks.unshift({ description: req.body.description });
    await project.save();
    res.status(200).json(project);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      return res.status(404).json({ errors: [{ msg: "Project not found" }] });
    res.status(500).send("Server Error");
  }
};

exports.deleteTaskFromProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: "Project not found" });

    if (project.user.toString() !== req.userId)
      return res.status(401).json({
        errors: [
          { msg: "You dont have permission to delete tasks from this project" }
        ]
      });

    const removeIndex = project.tasks
      .map(task => task._id.toString())
      .indexOf(req.params.task_id);

    if (removeIndex !== -1) {
      project.tasks.splice(removeIndex, 1);
      await project.save();
    }
    res.status(200).json(project);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Project not found" });
    res.status(500).send("Server Error");
  }
};

exports.editTaskFromProject = async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: "Project not found" });

    if (project.user.toString() !== req.userId)
      return res.status(401).json({
        errors: [
          { msg: "You dont have permission to edit tasks from this project" }
        ]
      });

    const { description, completed, finish_date } = req.body;

    const newTask = project.tasks.find(
      task => task._id.toString() === req.params.task_id
    );

    if (!newTask) return res.status(404).json({ msg: "Task not found" });

    description ? (newTask.description = description) : null;
    completed ? (newTask.completed = completed) : null;
    finish_date ? (newTask.finish_date = finish_date) : null;

    project.tasks.map(task => {
      if (task._id.toString() === req.params.task_id) {
        task = newTask;
      }
      return task;
    });

    project.save();

    res.status(200).json(project);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Project not found" });
    res.status(500).send("Server Error");
  }
};
