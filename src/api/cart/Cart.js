const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const CartSchema = new Schema(
  {
    total: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

exports.Cart = model("Cart", CartSchema);
