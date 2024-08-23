const multer = require("multer");
const path = require("path");
<<<<<<< HEAD
<<<<<<< HEAD
=======
const fs=require("fs")
>>>>>>> bfda625 (okdevelopment)
=======
const fs=require("fs")
>>>>>>> bfda625c472e51baf8558974c2dfd6f936ad5ef5

// Define storage for multer
const multerStorageUser = multer.diskStorage({
  destination: (req, file, cb) => {
<<<<<<< HEAD
<<<<<<< HEAD
    // Ensure the path is correctly resolved
    cb(null, path.resolve(__dirname, "../files"));
  },
=======
=======
>>>>>>> bfda625c472e51baf8558974c2dfd6f936ad5ef5
    const uploadPath = path.join(__dirname, "../../files");
    // Ensure directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },  
<<<<<<< HEAD
>>>>>>> bfda625 (okdevelopment)
=======
>>>>>>> bfda625c472e51baf8558974c2dfd6f936ad5ef5
  filename: (req, file, cb) => {
    // Construct the filename
    const filename = `${Date.now()}-${file.originalname}`;
    req.file = `files/${filename}`;
    cb(null, filename);
  },
});
const uploadsUser = multer({
  storage: multerStorageUser,
});

// Export the middleware for handling the file upload
module.exports = uploadsUser.fields([{ name: "file", maxCount: 1 }]);
