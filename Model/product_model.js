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
  },
  {
    timestamps: true,
  }
);
productSchema.index({ location: "2dsphere" });

const productSchemaData = mongoose.model("Product", productSchema);
module.exports = productSchemaData;
