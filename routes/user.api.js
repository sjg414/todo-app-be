const express = require("express");
const userController = require("../controller/user.controller");
const router = express.Router();

router.post("/", userController.createUser); //회원가입
router.post("/login", userController.loginWithEmail); //req.body에 정보를 받기 위해서 post를 사용해야한다.(get은 req.body 사용 불가!!)

module.exports = router;
