const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
      },
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
        type: String,
        
      }
      });
      module.exports = mongoose.model('cartItems', CartSchema);