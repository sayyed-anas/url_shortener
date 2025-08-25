const mongoose = require("mongoose");

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

module.exports = Url;
