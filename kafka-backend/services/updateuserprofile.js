const User = require('../models/User');
const config = require('config');
const connectDB = require('../config/db');
const product =require('../models/productModel');
connectDB();

async function handle_request(msg, callback){
    var response = {};
    
    try {
        const {email,uname,city,dateofbirth,mobile,address,country,picture} = msg;
    let result = await User.findOneAndUpdate({email:email},msg,{upsert :true, new: true})
    if (result)
    {
        response.status = 200;
        response.message ='success';
        return callback(null,{success:true});
    }
    else{
        response.status = 400;
    response.message = 'failure';
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