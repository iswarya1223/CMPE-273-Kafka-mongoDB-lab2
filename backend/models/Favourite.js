const mongoose = require('mongoose');

const FavouriteSchema = new mongoose.Schema({
  //_id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
  
  },
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'product', 
    required: true, },
    
});


module.exports = mongoose.model('favourite', FavouriteSchema);