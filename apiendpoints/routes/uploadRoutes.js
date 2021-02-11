import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  // destination(req, files, cb) {
  //   cb(null, "uploads/");
  // },
  // filename(req, files, cb) {
  //   files.map((file) =>
  //     cb(
  //       null,
  //       `${file.fieldname}-${Date.now()}${path.extname(file.origninalname)}`
  //     )
  //   );
  // },
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.origninalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }
  cb("Images only");
}

const upload = multer({
  // limits: {
  // files: 6,
  // fileSize: 500,
  // },
  storage,
  fileFilter(req, files, cb) {
    files.map((file) => checkFileType(file, cb));
  },
});

// router.post("/", upload.array("image", 6), (req, res) => {
//   res.send(`/${req.files.path}`);
router.post("/", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default router;
