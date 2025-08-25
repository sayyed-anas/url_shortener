const express = require("express");
const { shortUrl } = require("../controller/url.controller");

const urlRouter = express.Router();

// POST - shorten URL
urlRouter.route("/shorten").post(shortUrl);

module.exports = urlRouter;
