const mongoose = require('mongoose');

const FavouriteSchema = new mongoose.Schema({
 
  email: {
    type: String,
    required: true
  },
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'products', 
    required: true },
});

module.exports = mongoose.model('favourite', FavouriteSchema);