const User = require('../models/User');
const config = require('config');
const connectDB = require('../config/db');

connectDB();

async function handle_request(msg, callback){
   
    //{$set:{item_name:item_name,foodtype:foodtype,price:price}},{new: true}

    try{ 
        var response ={}
        const {shopname} = msg;
      let shopunique = await User.find({ shopname });
            if(shopunique.length !== 0){
                response.status = 200;
                response.message = {
                    success: false,shopunique
                  };
                return callback(null, response); 
                     }      
            else{
              
                response.status = 200;
                response.message = {
                    success: true
                  };
                return callback(null, response); 
                //console.log("Restaurant already existed!");
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