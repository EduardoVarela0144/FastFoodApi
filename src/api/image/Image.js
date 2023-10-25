const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    downloadUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.model("Image", documentSchema);

module.exports = Image;
