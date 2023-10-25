const { Product } = require('./Product');

exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("seller");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).populate("seller");
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.productId);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};
