const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const validateTask = require("../middleware/validateTask");

router.post("/", validateTask, taskController.createTask);
router.get("/", taskController.getAllTasks);
router.get("/:id", taskController.getTaskById);
router.put("/:id", validateTask, taskController.updateTask);
router.delete("/:id", taskController.deleteTask);
router.put("/:id/status", taskController.updateTaskStatus);

module.exports = router;
