const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    shopname: {
        type: String,
      },
      category :{
        type: String
      }
    })

    module.exports = mongoose.model('shopcategory', CategorySchema);