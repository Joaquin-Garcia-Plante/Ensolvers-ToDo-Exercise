const { Task } = require("../db");

const postTask = async (req, res) => {
  try {
    const { title } = req.body;
    const newTask = await Task.create({
      title: title.trim(),
    });
    return res.json({ message: "Task added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const modifyTask = async (req, res) => {
  try {
    let { title } = req.body;
    const { id } = req.params;
    const taskmodify = await Task.update(
      {
        title: title.trim(),
      },
      {
        where: {
          id: id,
        },
      }
    );
    return res.json({ message: "Task successfully modified" });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.json({ message: "Task not found" });
    }
    Task.destroy({
      where: {
        id: id, //this will be your id that you want to delete
      },
    }).then(
      function (rowDeleted) {
        // rowDeleted will return number of rows deleted
        if (rowDeleted === 1) {
          return res.json({ message: "Task deleted successfully" });
        }
      },
      function (err) {
        return res.status(500).send(error);
      }
    );
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.findAll({ attributes: ["title", "id"] });
    if (allTasks) {
      return res.json(allTasks);
    } else {
      return res.json({ message: "Tasks not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.json({ message: "Task not found" });
    }
    return res.json(task);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const changeCompletedTask = async (req, res) => {
  try {
    const { id } = req.params;
    var completed = false;
    const task = await Task.findByPk(id);
    if (task.completed) {
      completed = false;
    } else {
      completed = true;
    }
    const taskmodify = await Task.update(
      {
        completed: completed,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return res.json({ message: "Task modify" });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
module.exports = { postTask, modifyTask, deleteTask, getAllTasks, getTask, changeCompletedTask };
