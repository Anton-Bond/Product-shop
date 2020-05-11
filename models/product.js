const {Schema, model} = require('mongoose');

const productSchema = new Schema({
  prodCode: String,
  name: String,
  price: Number
});

module.exports = model('Product', productSchema);