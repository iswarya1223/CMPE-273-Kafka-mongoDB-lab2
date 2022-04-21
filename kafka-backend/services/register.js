var User =require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const connectDB = require('../config/db');

connectDB();

async function handle_request(msg, callback){
  
    var response = {};
    
    
      
        const { uname, email, password } = msg;

        try {
          let user = await User.findOne({ email });
    
          if (user) {

              response.status = 400;
              response.message = 'failure';
             return callback(null, response);
          }
    
          
    
          user = new User({
            uname,
            email,
            password
          });
    
          const salt = await bcrypt.genSalt(10);
    
          user.password = await bcrypt.hash(password, salt);
    
          await user.save();
          response.status = 200;
          response.message = user;
          return callback(null, response);
    
        
       
    } catch (err) {
        console.error(err.message);
        response.status = 500;
        response.message = 'Server Error';
        return callback(err, response);
    }
}
    

exports.handle_request = handle_request;