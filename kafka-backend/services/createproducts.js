const User = require('../models/User');
const config = require('config');
const connectDB = require('../config/db');
const product =require('../models/productModel');
connectDB();

async function handle_request(msg, callback){
    var response = {};
    try {
        console.log(msg);
        const {productname,description,price,category,stock,image_URL,shopname,currency} = msg;
        let products =[]
        products = new product({
            productname,description,price,category,stock,image_URL,shopname,currency
          });
    
          await products.save();
            //res.send(error.code);
            response.status = 200;
            response.message ='success';
            return callback(null,{success:true});
           
    }


catch (err) {
    console.error(err.message);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
}
}


exports.handle_request = handle_request;