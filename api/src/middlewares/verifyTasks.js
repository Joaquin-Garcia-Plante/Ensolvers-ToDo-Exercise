const { Task } = require("../db");
const { validate } = require("uuid");

const checkTaskExist = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (validate(id)) {
      const task = await Task.findByPk(id);
      if (!task) {
        return res.status(400).json({ message: "Task not found" });
      }
      return next();
    } else {
      return res.status(400).json({ message: "invalid id" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

module.exports = { checkTaskExist };
