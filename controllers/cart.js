const Cart = require('../models/cart');

module.exports.getAll = async function(req, res) {
  try {
    const cart = await Cart.find()
      .populate('productId', 'prodCode name price');
    res.status(200).json(cart);
  } catch (e) {
    console.log(e);
  }
}

// module.exports.remove = async function(req, res) {
//   try {
//     await Cart.remove({_id: req.params.id})
//     res.status(200).json({
//       message: 'Продукт удален.'
//     })
//   } catch (e) {
//     console.log(e);
//   }
// }

// delete one count of product from cart by id
const deleteProductFromCart = async id => {
  const product = await Cart.findById(id).populate('productId', 'name');;
  if (product.count > 1) {
    // update count if more than one
    await Cart.findByIdAndUpdate(product._id, {count: --product.count});
  } else {
    // delete if count === 1
    await Cart.findByIdAndDelete(id);
  }
  return product;
}

// delete product from cart by id from cart page
module.exports.remove = async function(req, res) {
  try {
    const product = await deleteProductFromCart(req.params.id);
    res.status(200).json(product);
  } catch (e) {
    console.log(e);
  }
}