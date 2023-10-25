const express = require("express");
const router = express.Router();
const  ImageController = require("./image.controller");

router.post("/upload", ImageController.uploadImageFromUri);

module.exports = router;
