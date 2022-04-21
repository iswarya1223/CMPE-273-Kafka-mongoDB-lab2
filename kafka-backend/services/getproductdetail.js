const config = require('config');
const connectDB = require('../config/db');
const User = require('../models/User');
const Order = require('../models/Order');
const product = require("../models/productModel");

connectDB();

async function handle_request(msg, callback){
    var response ={};
    try{  
        let productdetail = await product.findOne({ _id: msg._id });
        if(productdetail)
        {
            response.status = 200;
                    response.message = 'true';
                    return callback(null, {success: true,productdetail});
        }
        else{
            response.status = 400;
            response.message = 'false';
            return callback(null, response);
        }
       }
    
     catch (err) {
        console.error(err.message);
        response.status = 500;
        response.message = 'Server Error';
        return callback(err, response);
    }
}
    

exports.handle_request = handle_request;