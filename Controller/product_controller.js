const AppError = require("../utils/appError");
const product_model = require("../Model/product_model");
const { successMessage } = require("../functions/success/success_functions");
const catchAsync = require("../utils/catchAsync");
const {
  productValidationSchema,
  updateproductValidationSchema,
} = require("../utils/validation/product_joi_validation");
const {
  fileExistsSync,
  deleteFile,
} = require("../functions/forFiles/forFiles_functions");
const {
  checkFilesExist,
  generateStaticFileUrl,
  getFileName,
} = require("../functions/forFiles/checkfileexist");
const {
  checkDuplicateImgsInRecords,
} = require("../functions/imagesInRecords/imagesInRecords_functions");

// method POST
// route /api/v1/product/:
// @desc create product
// @privacy only autheticated user can  do this
const createProduct = catchAsync(async (req, res, next) => {
  // Validate the request body against the schema
  const { error, value } = productValidationSchema.validate(req.body);

  if (error) {
    const errors = error.details.map((el) => el.message);
    return next(new AppError(errors, 400));
  }

  // Check if all product images exist in the file system
  const fileCheckResult = await checkFilesExist(value.ProductImage);
  if (!fileCheckResult.success) {
    return next(new AppError(fileCheckResult.message, 400));
  }

  // Check if a product with the same image already exists in the database
  const productWithProductImageInDatabase = await checkDuplicateImgsInRecords(
    value.ProductImage,
    "ProductImage"
  );

  if (!productWithProductImageInDatabase.success) {
    return next(new AppError(productWithProductImageInDatabase.message, 400));
  }

  // Create the product
  const product = await product_model.create({
    vendorId: req.user.id,
    ...value,
  });

  product.ProductImage = generateStaticFileUrl(product.ProductImage);

  successMessage(202, res, "Product added successfully", product);
});

// method GET
// route /api/v1/product/:
// @desc get all products
// @privacy only autheticated user can  do this
const getallProducts = catchAsync(async (req, res, next) => {
  let products = await product_model.find({
    vendorId: req.user.id,
  });
  if (!products) {
    return next(new AppError("No products found", 404));
  }
  products = products.map((item) => {
    item.ProductImage = generateStaticFileUrl(item.ProductImage);
    return item;
  });
  successMessage(202, res, "get all Product", products);
});
// method DELETE
// route /api/v1/product/{id}:
// @desc delete product
// @privacy only autheticated user can  do this
const deleteProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await product_model.findByIdAndDelete(id, {
    vendorId: req.user.id,
  });
  if (!product) {
    return next(new AppError("Product not found", 400));
  }
  successMessage(202, res, "Product deleted successfully");
  await Promise.all(
    product.ProductImage.map(async (item) => {
      await deleteFile(item);
    })
  );
});
// method PUT
// route /api/v1/product/{id}:
// @desc update product
// @privacy only autheticated user can  do this
const updateProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { error, value } = updateproductValidationSchema.validate(req.body);
  if (error) {
    const errors = error.details.map((el) => el.message);
    return next(new AppError(errors, 400));
  }
  value.ProductImage = getFileName(value.ProductImage);

  const product = await product_model.findOne({
    _id: id,
    vendorId: req.user.id,
  });
  if (!product) {
    return next(new AppError("Product not found", 404));
  }
  // let productWithProductImageInDatabase;
  const { success, message } = await checkFilesExist(value.ProductImage);
  if (!success) {
    return next(new AppError(message, 400));
  }

  await Promise.all(
    value.ProductImage.map(async (item) => {
      if (!product.ProductImage.includes(item)) {
        const { success, message } = await checkDuplicateImgsInRecords(
          [item],
          "ProductImage"
        );
        if (!success) {
          return next(new AppError(message, 400));
        }
      }
    })
  );

  const updatedProduct = await product_model.findByIdAndUpdate(
    {
      _id: id,
      vendorId: req.user.id,
    },
    {
      ...value,
    },
    {
      new: true,
    }
  );
  updatedProduct.ProductImage = generateStaticFileUrl(
    updatedProduct.ProductImage
  );
  successMessage(200, res, "Product updated successfully", updatedProduct);
  await Promise.all(
    product.ProductImage.map(async (item) => {
      if (!updatedProduct.ProductImage.includes(item)) {
        await deleteFile(item);
      }
    })
  );
});

module.exports = {
  createProduct,
  getallProducts,
  deleteProduct,
  updateProduct,
};
