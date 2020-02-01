const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const auth = require("../middleware/auth");
const projectsController = require("../controllers/projectsController");

router.use(auth);

// @route   GET projects/
// @desc    Get user projects
// @access  private
router.get("/", projectsController.getUserProjects);

// @route   POST projects/
// @desc    Create project
// @access  private
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty()
  ],
  projectsController.createProject
);

// @route   DELETE projects/:id
// @desc    Delete project
// @access  private
router.delete("/:id", projectsController.deleteProject);

// @route   PUT projects/:id
// @desc    Edit project
// @access  private
router.put(
  "/:id",
  [
    check("name", "Name is required")
      .not()
      .isEmpty()
  ],
  projectsController.updateProject
);

// @route   POST projects/:id/tasks
// @desc    Add task to project
// @access  private
router.post(
  "/:id/tasks",
  [
    check("description", "Description is required")
      .not()
      .isEmpty()
  ],
  projectsController.addTaskToProject
);

// @route   DELETE projects/:id/tasks/:task_id
// @desc    Delete task from project
// @access  private
router.delete("/:id/tasks/:task_id", projectsController.deleteTaskFromProject);

// @route   PUT projects/:id/tasks/:task_id
// @desc    Edit task from project
// @access  private

module.exports = router;
