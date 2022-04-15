const checkTitleExist = async (req, res, next) => {
  const { title } = req.body;
  if (!title) {
    console.log("title not exist");
    return res.status(400).json({ message: "Title not found" });
  }
  return next();
};

module.exports = { checkTitleExist };
