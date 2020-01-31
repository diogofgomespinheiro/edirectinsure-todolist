const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const auth = require("../middleware/auth");
const projectsController = require("../controllers/projects");

router.use(auth);

// @route   GET projects/
// @desc    Get user projects
// @access  private
router.get("/", projectsController.GetUserProjects);

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
  projectsController.CreateProject
);

// @route   DELETE projects/:id
// @desc    Delete project
// @access  private

// @route   PUT projects/:id
// @desc    Edit project
// @access  private

// @route   POST projects/:id/tasks
// @desc    Add task to project
// @access  private

// @route   DELETE projects/:id/tasks/:task_id
// @desc    Delete task from project
// @access  private

// @route   PUT projects/:id/tasks/:task_id
// @desc    Edit task from project
// @access  private

module.exports = router;
