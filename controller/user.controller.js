const User = require("../model/User");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const userController = {};

//회원가입
userController.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body; //FE에서 보낸 data
    const findUser = await User.findOne({ email }); //중복가입 확인을 위해 email로 검색
    if (findUser) {
      //중복가입일 경우
      throw new Error(console.log("이미 가입이 된 유저입니다."));
    } else {
      const salt = bcrypt.genSaltSync(saltRounds); //비밀번호 암호화를 위한 키
      const hash = bcrypt.hashSync(password, salt); //비밀번호 암호화
      const newUser = new User({ name, email, password: hash }); //새로운 유저 생성(회원가입)
      await newUser.save(); //유저정보 DB에 저장
      res.status(200).json({ status: "success" });
    }
  } catch (err) {
    res.status(400).json({ status: "fail", error: console.log(err) });
  }
};

//로그인
userController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body; //FE에서 보낸 user정보
    const findUser = await User.findOne(
      { email },
      "-createdAt -updatedAt -__v"
    ); //email로 검색
    if (findUser) {
      //해당 유저가 있을 경우
      const isMatch = bcrypt.compareSync(password, findUser.password); //암호화 된 비밀번호와 비교
      if (isMatch) {
        //비밀번호 일치 시
        const token = findUser.generateToken(); //토큰생성
        res.status(200).json({ status: "success", findUser, token });
      } else {
        //비밀번호가 일치하지 않을 경우
        throw new Error("비밀번호가 틀렸습니다.");
      }
    } else {
      //이메일이 일치하지 않을 경우
      throw new Error("email이 틀렸습니다.");
    }
  } catch (err) {
    res.status(400).json({ status: "fail", error: console.log(err) });
  }
};

module.exports = userController;
