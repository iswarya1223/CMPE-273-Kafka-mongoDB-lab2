const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  
  productname: {
    type: String
  },
  description: {
    type: String
  },
  price: {
    type: Number
  },
  category:{
    type: String
  },
  stock: {
    type: Number
  },
  image_URL:{
    type: String
  },
  shopname:{
    type: String
  },
  currency:{
    type: String
  },
  salescount: {
    type: Number
  },
});

module.exports = mongoose.model('product', ProductSchema);