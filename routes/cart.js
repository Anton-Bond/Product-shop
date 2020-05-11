const {Router} = require('express');
const Cart = require('../models/cart');
const router = Router();

// go to cart page
router.get('/', async (req, res) => {
  // get list of cart
  const cart = await Cart.find()
  // get field of product by id
  .populate('productId', 'prodCode name price');
  res.render('cart', {
    title: 'Корзина',
    // for active tab in navbar
    isCart: true,
    // send to cart page content of cart
    cart
  });
});

// delete one count of product from cart by id
const deleteProductFromCart = async id => {
  const product = await Cart.findById(id);
  if (product.count > 1) {
    // update count if more than one
    await Cart.findByIdAndUpdate(product._id, {count: --product.count});
  } else {
    // delete if count === 1
    await Cart.findByIdAndDelete(id);
  }
}

// delete product from cart by id from cart page
router.post('/', async (req, res) => {
  await deleteProductFromCart(req.body.id);
  res.redirect('cart');
});

module.exports = router;