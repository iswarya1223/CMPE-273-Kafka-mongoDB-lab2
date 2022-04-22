const User = require('../models/User');
const config = require('config');
const connectDB = require('../config/db');
const Favourite = require('../models/Favourite');
const Product =require('../models/productModel');
const Cart = require('../models/Cart');
connectDB();

async function handle_request(msg, callback){
    var response = {};
    console.log(msg);
    try{  
        var id = msg[0].productid;
        let results = await Product.findByIdAndUpdate(id,msg[1],{new:true});
            if(!results){
                response.status = 400;
                response.message ='failure';
                return callback(null,response);
            }else{
                //res.end(JSON.stringify(results));
                response.status = 200;
                response.message ='success';
                return callback(null,{success:true,results});
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