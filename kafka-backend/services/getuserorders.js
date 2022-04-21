const config = require('config');
const connectDB = require('../config/db');
const Order = require('../models/Order');
const product = require("../models/productModel");

connectDB();

async function handle_request(msg, callback){
  
    var response = {};
      
        const {email,resultsperpage,currentPage}  = msg;

        try {
            const ordersCount = await Order.countDocuments();
            let results = await Order.find({ email: email}).limit(resultsperpage*1).skip(resultsperpage*(currentPage-1))
                    response.status = 200;
                    response.message = 'true';
                    return callback(null, {results,ordersCount});
       
    } catch (err) {
        console.error(err.message);
        response.status = 500;
        response.message = 'Server Error';
        return callback(err, response);
    }
}
    

exports.handle_request = handle_request;