const { Folder } = require("../db");
const { Task } = require("../db");

const postFolder = async (req, res) => {
  try {
    const { title } = req.body;
    const newFolder = await Folder.create({
      title: title.trim(),
    });
    return res.json({ message: "Folder created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const addTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const folder = await Folder.findByPk(id);
    const newTask = await Task.create({
      title: title.trim(),
    });
    await folder.addTask(newTask);
    return res.json({ message: "Task added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const getTasks = async (req, res) => {
  try {
    const { id } = req.params;
    var folder = await Folder.findByPk(id, {
      include: {
        model: Task,
        through: { attributes: [] },
        attributes: ["title", "id", "completed"],
      },
    });
    if (!folder) {
      return res.json({ message: "Folder not found" });
    }
    if ("tasks" in folder) {
      if (folder.tasks.length <= 0) {
        return res.json([]);
      }
      return res.json(folder.tasks);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
const removeFolder = async (req, res) => {
  try {
    const { id } = req.params;
    var folder = await Folder.findByPk(id, {
      include: {
        model: Task,
        through: { attributes: [] },
        attributes: ["title", "id"],
      },
    });
    if (!folder) {
      return res.json({ message: "Folder not found" });
    }
    if ("tasks" in folder) {
      if (folder.tasks.length > 0) {
        await folder.tasks.forEach((e) => {
          Task.destroy({
            where: {
              id: e.id,
            },
          });
        });
      }
    }
    Folder.destroy({
      where: {
        id: id, //this will be your id that you want to delete
      },
    }).then(
      function (rowDeleted) {
        // rowDeleted will return number of rows deleted
        if (rowDeleted === 1) {
          return res.json({ message: "Folder deleted successfully" });
        }
      },
      function (err) {
        return res.status(500).send(error);
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const getAllFolders = async (req, res) => {
  try {
    const allFolders = await Folder.findAll({ attributes: ["title", "id"] });
    if (allFolders) {
      return res.json(allFolders);
    } else {
      return res.json({ message: "Folders not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const getFolder = async (req, res) => {
  try {
    const { id } = req.params;
    var folder = await Folder.findByPk(id, {
      include: {
        model: Task,
        through: { attributes: [] },
        attributes: ["title", "id"],
      },
    });
    if (!folder) {
      return res.json({ message: "Folder not found" });
    }
    return res.json(folder);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

module.exports = { postFolder, addTask, getTasks, removeFolder, getAllFolders, getFolder };
