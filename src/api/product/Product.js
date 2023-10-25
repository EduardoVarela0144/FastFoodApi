const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
    description : { type: String, required: true },
    seller: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
  },
  { timestamps: true }
);

exports.Product = model("Product", ProductSchema);
