const Category = require('../models/Category');
const config = require('config');
const connectDB = require('../config/db');
connectDB();

async function handle_request(msg, callback){
  
    const {shopname,category} = msg;
    try{  
        var response = {};
        let categories =[]
        categories = new Category({
            shopname,
            category,
          });
    
          await categories.save();
                         //res.end(JSON.stringify(results));
                         response.status = 200;
                         response.message ={success: true};
                         return callback(null, response);
            }      
catch (err) {
    console.error(err.message);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
}
}


exports.handle_request = handle_request;