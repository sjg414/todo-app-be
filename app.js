const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); //다른 도메인 or 포트에서 호출 할 시 보안 상의 이유로 거절되는 것을 해결
const bodyParser = require("body-parser"); //json의 body 정보 받기 위해
const indexRouter = require("./routes/index");
require("dotenv").config(); //.env 사용을 위해
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api", indexRouter); // /api 주소로 요청이 올 경우 indexRouter 사용
const mongoURI = MONGODB_URI_PROD;

//mongoose setting
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => {
    console.log("DB connection fail", err);
  });

//express connect
app.listen(process.env.PORT || 4000, () => {
  console.log("server on 4000");
});

//1. 회원가입
/*유저가 이메일, 패스워드, 유저이름을 입력해서 보냄
받은 정보를 저장함(db model 필요)
패스워드를 암호화 시켜서 저장(보안 중요!) */

/*1. 라우터 세팅
2. 모델 만들기
3. 데이터 저장(중복 가입 파악 후, 패스워드 암호화 필수)
4. 응답 보내기 */

//2. 로그인
/* 이메일 패스워드를 입력해서 보냄
데이터베이스에 해당 이메일과 패스워드를 가진 유저가 있는지 확인
없으면 로그인 실패
있다면? 유저정보 + 토큰 */

/* 1. 라우터 설정
2. 이메일 패스워드 정보 읽어오기
3. 이메일을 가지고 유저정보 가져오기
4. 이 유저의 디비에 있는 패스워드와 FE가 보낸 패스워드가 같은지 비교
5. 맞으면, 토큰 발행
6. 틀리면 에러메세지 보냄
7. 응답으로 유저정보 + 토큰 보냄*/