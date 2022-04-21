var User =require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const connectDB = require('../config/db');
const {secret} = require('../utils/config');
connectDB();

async function handle_request(msg, callback){
  
    var response = {};
    
    const {email,password} = msg;
    try{  
      let user = await User.find({ email });
        if(user.length  === 0)
        {
            response.status = 401;
            response.message = "user doesn't exist please register";
           return callback(null, response);
        }
        else{
            bcrypt.compare(password, user[0].password, function(err, isMatch){
            if (err) {
                throw err
              } else if (!isMatch) {
                response.status = 400;
                response.message = "failure";
               return callback(null, response);
              } else {
                const payload = {email : user[0].email};
                const token = jwt.sign(payload,secret, {
                 expiresIn: 10080000
                });
                response.status = 200;
                response.message = {token: "JWT " + token, user};
               return callback(null, response);
                
            }
              })
        }
        
       
    } catch (err) {
        console.error(err.message);
        response.status = 500;
        response.message = 'Server Error';
        return callback(null, response);
    }
}
    

exports.handle_request = handle_request;