const Category = require('../models/Category');
const config = require('config');
const connectDB = require('../config/db');
connectDB();

async function handle_request(msg, callback){
  
   
    const {shopname} = msg;
    try{  
        var response ={}
        let results = await Category.find({ $or :[{shopname:shopname} , {shopname : "NULL"}] })
                  if(!results){
  
                         //res.send(error.code);
                         response.status = 400;
                         response.message ={success: false};
                         return callback(null, response);
                         //res.status(400).json({success: false});
                     }else{
                         //res.end(JSON.stringify(results));
                         response.status = 200;
                         response.message ={success: true,results};
                         return callback(null, response);
                     }
                
            }      
    
catch (err) {
    console.error(err.message);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
}
}


exports.handle_request = handle_request;