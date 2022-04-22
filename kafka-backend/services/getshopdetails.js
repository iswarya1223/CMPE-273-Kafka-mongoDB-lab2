const config = require('config');
const connectDB = require('../config/db');
const User = require('../models/User');
const Order = require('../models/Order');
const product = require("../models/productModel");

connectDB();

async function handle_request(msg, callback){
    let response ={};
    const {shopname} = msg;
    try {
    let shopname1 = await product.find({ shopname });
    console.log(shopname1);
    if (shopname1.length === 0 ) {
        let results = await User.find({ shopname });
            if(results.length !== 0){
                response.status = 200;
                    response.message = 'true';
                    return callback(null, {success: true,results});
             }else{
                response.status = 400;
                    response.message = 'false';
                    return callback(null, response);
             }
}else {

    let shopdetails = await product.find({ shopname });
    let results = await User.find({ shopname });
   let results1 = await Order.aggregate([
    {
       $match :
                    { "orderdetails.shopname" : shopname },
           },
    {
       $project : {
           orderdetails : {
              $filter: {
                 input : "$orderdetails",
                 as : "orderdetail",
                 cond : 
                       { "$eq" : [ "$$orderdetail.shopname", shopname ] },
              }
           }
       }
    }
    ])
    //{EmployeeDetails:{$elemMatch:{EmployeePerformanceArea : "C++", Year : 1998}}
    let totalsalesrevenue=0;
await results1.forEach( (order) =>
{   
    // console.log('istfor loop',totalsalesrevenue);
   order.orderdetails.forEach( (orderdetail) => 
  {
    
    totalsalesrevenue =  (totalsalesrevenue + (orderdetail.price * orderdetail.quantity));
     console.log(totalsalesrevenue)
    
  })
})
    //connection.query(`SELECT sum(price * quatity) as totalsalesrevenue
     //from orderdetails where shopname=?;`,[shopname],function(error1,results1){
    console.log(totalsalesrevenue); 
    //console.log(results1); && results1.length !== 0
      if(results.length !== 0){
        return callback(null,{success: true,shopdetails,results,totalsalesrevenue});
       }else{
        response.status = 400;
        response.message = 'false';
        return callback(null, response);
       }
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