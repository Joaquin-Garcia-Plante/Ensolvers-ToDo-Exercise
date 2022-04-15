const { Router } = require("express");
const verifyTask = require("../middlewares/verifyTasks");
const taskCtrl = require("../controllers/taskController");
const middlewares = require("../middlewares/index");
const router = Router();

router.post("/add", [middlewares.checkTitleExist], taskCtrl.postTask);

router.put("/edit/:id", [middlewares.checkTitleExist, verifyTask.checkTaskExist], taskCtrl.modifyTask);

router.delete("/delete/:id", verifyTask.checkTaskExist, taskCtrl.deleteTask);

router.put("/changecompleted/:id", verifyTask.checkTaskExist, taskCtrl.changeCompletedTask);

router.get("/detail/:id", verifyTask.checkTaskExist, taskCtrl.getTask);

router.get("/", taskCtrl.getAllTasks);

module.exports = router;
