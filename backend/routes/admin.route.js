const express = require("express");
const { showAllUrls, removeUrl } = require("../controller/admin.controller");

const adminRouter = express.Router();

// Admin Route - show all URLs
adminRouter.route("/").get(showAllUrls);

// DELETE - remove a URL
adminRouter.route("/:id").delete(removeUrl);

module.exports = adminRouter;
