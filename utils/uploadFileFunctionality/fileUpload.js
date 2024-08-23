<<<<<<< HEAD
const multer = require("multer");
const path = require("path");
=======
// multer configuration
const multer = require("multer");
const path = require("path");
const fs = require("fs");
>>>>>>> bfda625 (okdevelopment)
const {
  getExtensionOfFile,
} = require("../../functions/forFiles/forFiles_functions");

const multerStorageUser = multer.diskStorage({
  destination: (req, file, cb) => {
<<<<<<< HEAD
    const uploadPath = path.join(__dirname, "../../files"); // Correct path to files directory
=======
    const uploadPath = path.join(__dirname, "../../files");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
>>>>>>> bfda625 (okdevelopment)
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    try {
<<<<<<< HEAD
      console.log(file);
      const fileExtension = getExtensionOfFile(file.originalname);
      const filename = `${Date.now()}.${fileExtension}`;
      req.file = `${filename}`;
=======
      // console.log(file);
      const fileExtension = getExtensionOfFile(file.originalname);
      const filename = `${Date.now()}.${fileExtension}`;
>>>>>>> bfda625 (okdevelopment)
      cb(null, filename);
    } catch (err) {
      console.error(err);
      cb(err);
    }
  },
});

const uploadsUser = multer({
  storage: multerStorageUser,
});

<<<<<<< HEAD
module.exports = uploadsUser.fields([{ name: "file", maxCount: 100 }]); // Changed "photo" to "file"
=======
module.exports = uploadsUser.fields([{ name: "file", maxCount: 100 }]);
>>>>>>> bfda625 (okdevelopment)
