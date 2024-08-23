<<<<<<< HEAD
<<<<<<< HEAD
const multer = require("multer");
const path = require("path");
=======
=======
>>>>>>> bfda625c472e51baf8558974c2dfd6f936ad5ef5
// multer configuration
const multer = require("multer");
const path = require("path");
const fs = require("fs");
<<<<<<< HEAD
>>>>>>> bfda625 (okdevelopment)
=======
>>>>>>> bfda625c472e51baf8558974c2dfd6f936ad5ef5
const {
  getExtensionOfFile,
} = require("../../functions/forFiles/forFiles_functions");

const multerStorageUser = multer.diskStorage({
  destination: (req, file, cb) => {
<<<<<<< HEAD
<<<<<<< HEAD
    const uploadPath = path.join(__dirname, "../../files"); // Correct path to files directory
=======
=======
>>>>>>> bfda625c472e51baf8558974c2dfd6f936ad5ef5
    const uploadPath = path.join(__dirname, "../../files");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
<<<<<<< HEAD
>>>>>>> bfda625 (okdevelopment)
=======
>>>>>>> bfda625c472e51baf8558974c2dfd6f936ad5ef5
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    try {
<<<<<<< HEAD
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
=======
      // console.log(file);
      const fileExtension = getExtensionOfFile(file.originalname);
      const filename = `${Date.now()}.${fileExtension}`;
>>>>>>> bfda625c472e51baf8558974c2dfd6f936ad5ef5
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
<<<<<<< HEAD
module.exports = uploadsUser.fields([{ name: "file", maxCount: 100 }]); // Changed "photo" to "file"
=======
module.exports = uploadsUser.fields([{ name: "file", maxCount: 100 }]);
>>>>>>> bfda625 (okdevelopment)
=======
module.exports = uploadsUser.fields([{ name: "file", maxCount: 100 }]);
>>>>>>> bfda625c472e51baf8558974c2dfd6f936ad5ef5
