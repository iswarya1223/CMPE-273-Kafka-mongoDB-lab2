const User = require('../models/User');
const config = require('config');
const connectDB = require('../config/db');
const product =require('../models/productModel');
connectDB();

async function handle_request(msg, callback){
    var response = {};
    
    try {
        let query={}
        const {min_price,max_price,sortType,outOfStock} = msg[0]
        let key= msg[1].keyword
        if (sortType)
        {
            var sort={};
            
            sort[sortType] = 1
        }
        //let products = await product.find(query).sort(sort);
        let products = await product.find({"productname" : new RegExp(key,'i'),price : {$gte: min_price,$lte:max_price},stock:{$gte: outOfStock}}).sort(sort)
          response.status = 200;
          response.message ='success';
          return callback(null,{success:true,products});
      }
catch (err) {
    console.error(err.message);
    response.status = 500;
    response.message = 'Server Error';
    return callback(err, response);
}
}


exports.handle_request = handle_request;