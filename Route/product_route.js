// define route
const express = require("express");
const ROUTE = express.Router();
// model
const vendor_model = require("../Model/vendor_model");
//controllers
const {
  createProduct,
  getallProducts,
  deleteProduct,
  updateProduct,
} = require("../Controller/product_controller");
// auth
const { verifyToken } = require("../utils/verifyToken_util");
// multer
const upload = require("../multer/multer");

/**
 * @swagger
 * /api/v1/product/:
 *   post:
 *     summary: Create a new product
 *     description: Adds a new product to the database. Requires authentication and product image validation.
 *     tags:
*       - User/Product 
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ProductImage:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: URL or path to the product image
 *                 example: ["path/to/image.jpg"]
 *               ProductName:
 *                 type: string
 *                 description: The name of the product
 *                 example: "Luxury Perfume"
 *               Listingtype:
 *                 type: boolean
 *                 description: Indicates the type of listing (e.g., sale, offer)
 *                 example: true
 *               OpenForOffer:
 *                 type: boolean
 *                 description: Indicates if the product is open for offers
 *                 example: true
 *               WhereToMeet:
 *                 type: boolean
 *                 description: Indicates where the seller is willing to meet the buyer
 *                 example: true
 *               AddLocation:
 *                 type: string
 *                 description: Additional location information
 *                 example: "Near Central Park"
 *               Price:
 *                 type: number
 *                 description: The price of the product
 *                 example: 99.99
 *               Description:
 *                 type: string
 *                 description: A description of the product
 *                 example: "A luxurious perfume with a blend of floral and citrus notes."
 *     responses:
 *       202:
 *         description: Product successfully created
 */
ROUTE.route("/").post(verifyToken([vendor_model]), createProduct);

/**
 * @swagger
 * /api/v1/product/:
 *   get:
 *     summary: Retrieve all products associated with a vendor
 *     tags:
*       - User/Product 
  *     security:
 *       - bearerAuth: []
 *     responses:
 *       202:
 *         description: Successfully retrieved all products
 */
ROUTE.route("/").get(verifyToken([vendor_model]),getallProducts);
/**
 * @swagger
 * /api/v1/product/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     description: Deletes a product based on the provided product ID.
 *     tags:
 *       - User/Product 
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete.
 *         schema:
 *           type: string
 *           example: 60d9fbc18b89b72e68865e9f
 *     responses:
 *       202:
 *         description: Product deleted successfully.
 */
ROUTE.route("/:id").delete(verifyToken([vendor_model]), deleteProduct);
/**
 * @swagger
* /api/v1/product/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags:
 *       - User/Product 
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ProductImage:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["image1.jpg", "image2.jpg"]
 *               ProductName:
 *                 type: string
 *                 example: "New Product Name"
 *               Listingtype:
 *                 type: boolean
 *                 example: true
 *               OpenForOffer:
 *                 type: boolean
 *                 example: true
 *               WhereToMeet:
 *                 type: boolean
 *                 example: true
 *               AddLocation:
 *                 type: string
 *                 example: "New York, NY"
 *               Price:
 *                 type: number
 *                 example: 99.99
 *               Description:
 *                 type: string
 *                 example: "This is a product description."
 *     responses:
 *       202:
 *         description: Product updated successfully
 */
ROUTE.route("/:id").put(verifyToken([vendor_model]), updateProduct);





module.exports = ROUTE;
