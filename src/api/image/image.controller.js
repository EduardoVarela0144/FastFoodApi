const Image = require("./Image");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${process.cwd()}/src/public/uploads/images`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

async function saveImage(req, res, error) {
  if (error) {
    console.error("Error uploading document:", error);
    return res.status(500).json({ error: "Error al cargar el documento" });
  }
  try {
    const newDocument = new Image({
      name: req.file.originalname,
      downloadUrl: `/uploads/images/${req.file.filename}`,
    });

    const document = await newDocument.save();

    return res.status(200).json({ document });
  } catch (error) {
    console.error("Error saving document:", error);
    return res.status(500).json({ error: "Error al guardar el documento" });
  }
}

const uploadImageFromUri = (req, res) => {
  upload.single("image")(req, res, async (error) => {
    saveImage(req, res, error);
  });
};

module.exports = {
  uploadImageFromUri,
};
