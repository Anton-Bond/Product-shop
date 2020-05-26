const Cart = require('../models/cart');
const Product = require('../models/product');

module.exports.getAll = async function(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (e) {
    console.log(e);
  }
}

// add to cart product's id and count it
const addToCart = async id => {
  // if cart exit product
  const product = await Cart.findOne({productId: id});
  if (product) {
    // increase count
    await Cart.findByIdAndUpdate(product._id, {count: ++product.count});
  } else {
    // add new product to cart
    const cart = new Cart({
      count: 1,
      productId: id
    });
    await cart.save();
  }
}

module.exports.addById = async function(req, res) {
  const products = await Product.find();
  const product = products.find(p => p._id.toString() === req.body.id);
  if (product) {
    await addToCart(product._id);
    res.status(201).json(product);
    console.log(`Продукт "${product.name}" добавлен в корзину`);
  } else {
    console.log(`Не найден продукт с таким кодом товара`);
  }



  // try {
  //   await category.save()
  //   res.status(201).json(category)
  // } catch (e) {
  //   errorHandler(res, e)
  // }
}