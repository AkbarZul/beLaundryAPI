const multer = require("multer");
const path = require("path");

const form = require("../form");

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const nameFormat = `${Date.now()}-${file.fieldname}${path.extname(
      file.originalname
    )}`;
    cb(null, nameFormat);
  },
});

const upload = multer({
  storage: multerStorage,
  limits: 3 * 1000 * 1000, // 3 MB
});

const multiUpload = (req, res, next) => {
  const uploadMulti = upload.array("image", 5);
  uploadMulti(req, res, (err) => {
    if (err) {
      form.error(res, {
        msg: "multer error",
        err,
      });
    } else {
      next();
    }
  });
};

module.exports = multiUpload;