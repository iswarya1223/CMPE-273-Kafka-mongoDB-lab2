const Favourite = require('../models/Favourite');
const config = require('config');
const connectDB = require('../config/db');

connectDB();

async function handle_request(msg, callback){
  
    var response = {};
      
        const {product,email}  = msg;

        try {
            Favourite.deleteOne({ email: email,product:product },  function(error,results){
                if(error){
                    response.status = 400;
                    response.message = 'failure';
                    return callback(null, response);
                   }
                   
                   if (results.deletedCount === 0) {
                    response.status = 400;
                    response.message = 'favorite item doesnot exist';
                    return callback(null, response);
                  }else{
                    response.status = 200;
                    response.message = 'true';
                    return callback(null, response);
                   }
               });
       
    } catch (err) {
        console.error(err.message);
        response.status = 500;
        response.message = 'Server Error';
        return callback(null, response);
    }
}
    

exports.handle_request = handle_request;