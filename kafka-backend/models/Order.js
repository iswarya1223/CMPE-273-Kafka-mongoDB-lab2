const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  
  email: {
    type: String,
    required: true
  },
  orderdate: {
    type: String,
    required: true
  },
  orderdetails: [{
  product :{
    type: mongoose.Schema.Types.ObjectId, 
        ref: 'product',
        required: true 
  },
  quantity :{
    type: Number,
    required: true 
  },
  shopname :{
    type: String,
    required: true 
  },
  price :{
    type: Number,
    required: true 
  },
  productname :{
    type: String,
    required: true
  },
  image_URL :{
    type: String,
    required: true
  },
  giftoption : {
    type: Boolean,
  required : true,
},
giftdescription : {
  type: String,}
  
  }],
  totalprice :{
    type: Number,
    required: true 
  },
});

module.exports = mongoose.model('order', OrderSchema);