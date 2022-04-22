const User = require('../models/User');
const config = require('config');
const connectDB = require('../config/db');
const Favourite = require('../models/Favourite');
const Product =require('../models/productModel');
const Cart = require('../models/Cart');
connectDB();

async function handle_request(msg, callback){
    var response = {};
        try{    
            const {_id,product} = msg;
            Product.deleteOne({_id:_id}, function(error,results){
             Favourite.deleteOne({product:product }, function(error,results){
             Cart.deleteOne({product:product}, function(error,results){
             if(error)
             {
                response.status = 400;
                response.message ='failure';
                return callback(error,{success:false});

              }else{
                response.status = 200;
                response.message ='success';
                return callback(null,{success:true});
              }
     
     })})})
    }


catch (err) {
    console.error(err.message);
    response.status = 500;
    response.message = 'Server Error';
    return callback(err, response);
}
}


exports.handle_request = handle_request;