const { Router } = require("express");
const tasks = require("./tasks");
const folders = require("./folders");
const router = Router();

router.use("/tasks", tasks);
router.use("/folders", folders);

module.exports = router;
