// catch
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// success
const { successMessage } = require("../functions/success/success_functions");

// method POST
// route /api/v1/upload/:
// @desc single file upload
//  @Access  vender can do this

// const uploadFile = catchAsync(async (req, res, next) => {
//   const fileName = req.file;
//   if (!fileName) {
//     return next(new Error("File not found"));
//   }
//   return successMessage(202, res, "success fully get file", fileName);
// });


// method POST
// route /api/v1/upload/uploadfile:
// @desc multiple file upload
//  @Access  vender can do this
const multiplefile = catchAsync(async (req, res, next) => {
  // console.log("Request files:", req.files);

  if (!req.files || !req.files.file || req.files.file.length === 0) {
    return next(new AppError("File not found", 400));
  }

  const filenames = req.files.file.map((file) => file.filename);

  return successMessage(202, res, "Files successfully uploaded", filenames);
});



module.exports = {
  // uploadFile,
  multiplefile,
};
