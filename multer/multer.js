const multer = require("multer");
const path = require("path");
<<<<<<< HEAD
=======
const fs=require("fs")
>>>>>>> bfda625 (okdevelopment)

// Define storage for multer
const multerStorageUser = multer.diskStorage({
  destination: (req, file, cb) => {
<<<<<<< HEAD
    // Ensure the path is correctly resolved
    cb(null, path.resolve(__dirname, "../files"));
  },
=======
    const uploadPath = path.join(__dirname, "../../files");
    // Ensure directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },  
>>>>>>> bfda625 (okdevelopment)
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
