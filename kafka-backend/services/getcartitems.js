const Cart = require('../models/Cart');
const config = require('config');
const connectDB = require('../config/db');
const product = require("../models/productModel");

connectDB();

async function handle_request(msg, callback){
  
    var response = {};
      
        const {email}  = msg;

        try {
            let results = await Cart.find({ email: email}).populate('product','stock currency');
                    response.status = 200;
                    response.message = 'true';
                    return callback(null, results);
       
    } catch (err) {
        console.error(err.message);
        response.status = 500;
        response.message = 'Server Error';
        return callback(err, response);
    }
}
    

exports.handle_request = handle_request;