const express = require("express");
const taskController = require("../controller/task.controller");
const router = express.Router();

//할 일 추가
router.post("/", taskController.createTask);

router.get("/", taskController.getTask);

router.put("/:id", taskController.updateTask);

router.delete("/:id", taskController.deleteTask);

module.exports = router;
