const Favourite = require('../models/Favourite');
const config = require('config');
const connectDB = require('../config/db');

connectDB();

async function handle_request(msg, callback){
  
    var response = {};
      
        const {product,email}  = msg;

        try {
            let favorite = await Favourite.find();
            favorite = new Favourite({
             email,
             product
             
           });
    
           await favorite.save();
                response.status = 200;
                response.message = 'true';
                return callback(null, response); 
       
    } catch (err) {
        console.error(err.message);
        response.status = 500;
        response.message = 'Server Error';
        return callback(null, response);
    }
}
    

exports.handle_request = handle_request;