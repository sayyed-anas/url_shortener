const Url = require("../model/url.model");

const showAllUrls = async (req, res) => {
  const urls = await Url.find().sort({ createdAt: -1 });
  res.json(urls);
};

const removeUrl = async (req, res) => {
  try {
    await Url.findByIdAndDelete(req.params.id);
    res.json({ message: "URL deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { showAllUrls, removeUrl };
