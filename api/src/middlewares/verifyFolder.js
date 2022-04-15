const { Folder } = require("../db");
const { validate } = require("uuid");

const checkFolderExist = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (validate(id)) {
      const folder = await Folder.findByPk(id);
      if (!folder) {
        return res.status(400).json({ message: "Folder not found" });
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

module.exports = { checkFolderExist };
