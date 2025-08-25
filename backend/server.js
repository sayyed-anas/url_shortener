require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/dbConnect");
const urlRouter = require("./routes/url.route");
const adminRouter = require("./routes/admin.route");
const { redirectUrl } = require("./controller/url.controller");

const app = express();
app.use(express.json());
app.use(cors());

// Connect MongoDB
dbConnect().then(() => {
  console.log("DB Connected successfully.");
});

// POST - shorten URL
app.use("/api", urlRouter);

// Admin Route - show all URLs
app.use("/api/admin/urls", adminRouter);

// GET - redirect
app.route("/:shortCode").get(redirectUrl);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
