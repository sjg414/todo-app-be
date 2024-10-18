const express = require("express");
const router = express.Router();
const taskApi = require("./task.api");

router.use("/tasks", taskApi); //중복되는 주소 묶기

module.exports = router;
