const {Router} = require('express');
const Product = require('../models/product');
const Cart = require('../models/cart');
const router = Router();

// get list of product from DB
router.get('/',async (req, res) => {
  const products = await Product.find();
  res.render('index', {
    // send title page
    title: 'Список продуктов',
    // for active tab in navbar
    isHome: true,
    // send to cart page list of products
    products
  });
});

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

// add new product to cart
router.post('/add', async (req, res) => {
  const products = await Product.find();
  const product = products.find(p => p._id.toString() === req.body.id);
  if (product) {
    await addToCart(product._id);
    res.render('index', {
      title: 'Список продуктов',
      isHome: true,
      tag: `Продукт "${product.name}" добавлен в корзину`,
      products
    });
  } else {
    res.render('index', {
      title: 'Список продуктов',
      isHome: true,
      tag: `Не найден продукт с таким кодом товара`,
      products
    });
  }
})

module.exports = router;