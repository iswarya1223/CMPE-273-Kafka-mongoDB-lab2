const Cart = require('../models/Cart');
const config = require('config');
const connectDB = require('../config/db');
const Order = require('../models/Order');
const product =require('../models/productModel')
connectDB();

async function handle_request(msg, callback){
  
    var response = {};
    const orderdate1 = {orderdate:new Date().toISOString().slice(0, 10)}
    const {orderdate} =orderdate1
    try {
        const {email,totalprice} = msg;
        let order=[]
    
        let orderdetails = await Cart.find({ email: email})
        order = new Order({
            email,
            orderdate,
            orderdetails,
            totalprice
        })
        await order.save();
        await orderdetails.forEach( async (order) =>
        {   try{
            let stock=0;
            let salescount=0;
            let products=  await product.find({ _id: order.product });
            
            stock = ((products[0].stock)-(order.quantity));
            if(products[0].salescount)
            {
            salescount =  ((products[0].salescount) + (order.quantity));
            }
            else{
                salescount =  order.quantity
            }
            let result = await  product.findOneAndUpdate({_id:order.product},{stock:stock,salescount:salescount},{upsert :true, new: true});
        }
        catch(err){
            response.status = 500;
                        response.message = 'server error';
                        return callback(err, response);  
        }
        });
        Cart.deleteMany({ email: email},  function(error,results){
            if(error){
                response.status = 400;
                        response.message = 'false';
                        return callback(error, response); 
               }
               
               else 
               {
                response.status = 200;
                response.message = 'true';
                return callback(null, response); 
               }  
    })}


catch (err) {
    console.error(err.message);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
}
}


exports.handle_request = handle_request;