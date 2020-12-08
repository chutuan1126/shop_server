const  mongoose = require('mongoose');

const product = new mongoose.Schema({
    id: Number,
    sku: String,
    url: String,
    name: String,
    price: Object,
    brand: Object,
    images: Array,
    categories: Array,
    displayName: String,
    attributeSet: Object,
    sellerCategories: Array
  });

const products = mongoose.model('products', product, 'products');

module.exports = products;