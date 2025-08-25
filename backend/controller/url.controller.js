const Url = require("../model/url.model");
const shortid = require("shortid");

const shortUrl = async (req, res) => {
  const { longUrl } = req.body;
  const shortCode = shortid.generate();

  const url = new Url({ longUrl, shortCode });
  await url.save();

  res.json({ shortUrl: `http://localhost:5000/${shortCode}` });
};

const redirectUrl = async (req, res) => {
  const url = await Url.findOne({ shortCode: req.params.shortCode });
  if (!url) return res.status(404).send("URL not found");

  url.clicks++;
  await url.save();

  res.redirect(url.longUrl);
};

module.exports = { shortUrl, redirectUrl };
