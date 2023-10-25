const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const { Cart } = require("./Cart");

exports.createCart = async (req, res) => {
  try {
    const cart = new Cart(req.body);
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el carrito" });
  }
};

exports.getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find().populate("user").populate("products");
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los carritos" });
  }
};

exports.getCartById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId)
      .populate("user")
      .populate("products");
    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el carrito" });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.cartId,
      req.body,
      { new: true }
    );
    if (!updatedCart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el carrito" });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndRemove(req.params.cartId);
    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el carrito" });
  }
};

exports.getCartsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const carts = await Cart.find({ user: userId });
    res.status(200).json(carts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener los carritos del usuario" });
  }
};

exports.pay = async (req, res) => {
  try {
    const { name, amount } = req.body;
    if (!name) return res.status(400).json({ message: "Please enter a name" });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "MXN",
      payment_method_types: ["card"],
      metadata: { name },
    });
    const clientSecret = paymentIntent.client_secret;
    const paymentId = paymentIntent.id;
    res.json({ message: "Payment initiated", clientSecret, paymentId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
