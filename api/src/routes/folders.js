const { Router } = require("express");
const middlewares = require("../middlewares/index");
const verifyFolder = require("../middlewares/verifyFolder");
const folderCtrl = require("../controllers/folderController");
const router = Router();

router.post("/create", [middlewares.checkTitleExist], folderCtrl.postFolder);

router.post("/addtask/:id", [verifyFolder.checkFolderExist, middlewares.checkTitleExist], folderCtrl.addTask);

router.get("/watchtasks/:id", [verifyFolder.checkFolderExist], folderCtrl.getTasks);

router.delete("/remove/:id", verifyFolder.checkFolderExist, folderCtrl.removeFolder);

router.get("/get/:id", verifyFolder.checkFolderExist, folderCtrl.getFolder);

router.get("/", folderCtrl.getAllFolders);

module.exports = router;
