const path = require("path");
const fs = require("fs");

const getExtensionOfFile = (fileName) => {
  let lastDotIndex = fileName.lastIndexOf(".");

  // Split the string into two parts based on the last dot
  let firstPart = fileName.substring(0, lastDotIndex);
  let secondPart = fileName.substring(lastDotIndex + 1);

  // Create an array with the two parts
  return secondPart;
};
const deleteFile = async (filePath) => {
  return new Promise((resolve, reject) => {
    // Resolve the absolute path correctly
    const absolutePath = path.resolve(__dirname, "../../files", filePath);

    fs.unlink(absolutePath, (err) => {
      if (err) {
        console.log(`No file exists at ${absolutePath}`);
        reject(err); // Reject the promise if an error occurs
      } else {
        console.log(`${filePath} file deleted successfully`);
        resolve(); // Resolve the promise if deletion is successful
      }
    });
  });
};

function fileExistsSync(fileName) {
  const fs = require("fs");
  const path = require("path");
  // Example usage
  const folderPath = path.join(__dirname, "../../files");
  const filePath = path.join(folderPath, fileName);
  const fileExist = fs.existsSync(filePath);
  return fileExist;
}

module.exports = {
  getExtensionOfFile,
  deleteFile,
  fileExistsSync,
};
