const express = require("express");
const router = express.Router();
const taskApi = require("./task.api");
const userApi = require("./user.api");

//중복되는 주소 묶기
router.use("/tasks", taskApi);
router.use("/user", userApi);

module.exports = router;
