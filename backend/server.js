require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const shortid = require("shortid");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://url-shortener-2-cf78.onrender.com",
    credentials: true,
  })
);

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("DB Connected Successfully.");
});

// Schema
const UrlSchema = new mongoose.Schema(
  {
    longUrl: String,
    shortCode: String,
    clicks: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Url = mongoose.model("Url", UrlSchema);

// POST - shorten URL
app.post("/api/shorten", async (req, res) => {
  const { longUrl } = req.body;
  const shortCode = shortid.generate();

  const url = new Url({ longUrl, shortCode });
  await url.save();

  res.json({ shortUrl: `https://url-shortener-2-cf78.onrender.com/${shortCode}` });
});

// GET - redirect
app.get("/:shortCode", async (req, res) => {
  const url = await Url.findOne({ shortCode: req.params.shortCode });
  if (!url) return res.status(404).send("URL not found");

  url.clicks++;
  await url.save();

  res.redirect(url.longUrl);
});

// Admin Route - show all URLs
app.get("/api/admin/urls", async (req, res) => {
  const urls = await Url.find().sort({ createdAt: -1 });
  res.json(urls);
});

// DELETE - remove a URL
app.delete("/api/admin/urls/:id", async (req, res) => {
  try {
    await Url.findByIdAndDelete(req.params.id);
    res.json({ message: "URL deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
