const {Schema, model} = require('mongoose');

const cartSchema = new Schema({
  count: Number,
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }
});

module.exports = model('Cart', cartSchema);