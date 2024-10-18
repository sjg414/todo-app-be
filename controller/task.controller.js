const Task = require("../model/Task");

const taskController = {};

//할 일 추가하기
taskController.createTask = async (req, res) => {
  try {
    const { task, isComplete } = req.body; //filed 값 가져오기
    const newTask = new Task({ task, isComplete }); //새로운 모델 추가
    await newTask.save(); //저장
    res.status(200).json({ status: "ok", data: newTask }); //성공 시
  } catch (err) {
    res.status(400).json({ status: "fail", error: err }); //실패 시
  }
};

//등록된 할 일 목록 나타내기
taskController.getTask = async (req, res) => {
  try {
    const taskList = await Task.find({}).select("-__v"); //모든 데이터 검색하기(__v필드 제외)
    res.status(200).json({ status: "ok", data: taskList }); //성공 시
  } catch (err) {
    res.status(400).json({ status: "fail", error: err }); //실패 시
  }
};

//해당 id의 isComplete 필드 값 변경하기(ture or false)
taskController.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      throw new Error("Can not find the task!!");
    } else {
      // const fields = Object.keys(req.body);
      // fields.map((item) => (task[item] = req.body[item]));
      console.log("task?", task.isComplete);
      task.isComplete = !task.isComplete;
      await task.save();
      res.status(200).json({ status: "ok", data: task }); //성공 시
    }
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

//해당 id의 할 일 삭제하기
taskController.deleteTask = async (req, res) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params.id); //id로 해당 task 찾은 후 삭제
    res.status(200).json({ status: "ok", data: deleteTask });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

module.exports = taskController;
