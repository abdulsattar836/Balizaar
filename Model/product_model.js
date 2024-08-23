const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    ProductImage: [
      {
        type: String,
        required: true,
      },
    ],
    ProductName: {
      type: String,
      required: true,
    },
    Listingtype: {
      type: Number,
      default: 0, // 0 sale , 1 free
    },
    OpenForOffer: {
      type: Boolean,
      default: true,
    },
    WhereToMeet: {
      type: Boolean,
      default: true,
    },
    AddLocation: {
      type: String,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
<<<<<<< HEAD
     location: {
      type: {
        type: String,
        enum: ["Point"], // GeoJSON type
      },
      coordinates: {
        type: [Number], // Array of numbers for longitude and latitude
        required: true,
      },
    },
=======
>>>>>>> bfda625c472e51baf8558974c2dfd6f936ad5ef5
  },
  {
    timestamps: true,
  }
);
<<<<<<< HEAD
productSchema.index({ location: "2dsphere" });
=======
>>>>>>> bfda625c472e51baf8558974c2dfd6f936ad5ef5

const productSchemaData = mongoose.model("Product", productSchema);
module.exports = productSchemaData;
