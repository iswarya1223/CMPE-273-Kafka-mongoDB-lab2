const Cart = require('../models/Cart');
const config = require('config');
const connectDB = require('../config/db');

connectDB();

async function handle_request(msg, callback){
   
    //{$set:{item_name:item_name,foodtype:foodtype,price:price}},{new: true}
    try{  
        var response ={}
        const {email,product,giftoption} = msg;
         let result = await Cart.findOneAndUpdate({email:email, product : product},msg,{upsert :true, new: true})
         console.log(result)
         if (result)
         {
            response.status = 200;
            response.message = {
                success: true
              };
            return callback(null, response); 
         }
         else{
            response.status = 400;
            response.message = 'false'
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