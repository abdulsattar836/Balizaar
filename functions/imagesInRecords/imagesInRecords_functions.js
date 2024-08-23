// database model
const product_model = require("../../Model/product_model.js");

// check duplication of aws image in db
const checkDuplicateImgsInRecords = async (fileNames, fieldName) => {
  try {
    const promises = fileNames.map(async (fileName) => {
      const [product] = await Promise.all([
        product_model.findOne({ ProductImage: fileName }),
      ]);

      if (product) {
        return fileName;
      }
    });

    const results = await Promise.all(promises);

    const duplicates = results.filter((fileName) => fileName);

    if (duplicates.length > 0) {
      return {
        message: `These ${fieldName} are already used: ${duplicates.join(
          ", "
        )}`,
        success: false,
      };
    }

    // If none of the promises find a match, return some success message or proceed with other logic.
    return {
      message: `${fieldName} is unique and can be used.`,
      success: true,
    };
  } catch (error) {
    return {
      message: `An error occurred while checking ${fieldName}`,
      success: false,
    };
  }
};

module.exports = {
  checkDuplicateImgsInRecords,
};
