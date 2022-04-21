const Cart = require('../models/Cart');
const config = require('config');
const connectDB = require('../config/db');

connectDB();

async function handle_request(msg, callback){
  
    var response = {};
    //console.log("In handle request:"+ JSON.parse(msg));
        const {email,product,productname,image_URL,quantity,price,shopname}  = msg;

        try {
            let cart = await Cart.findOne({email:email,product:product});
            if(cart)
            {
                try {
                await Cart.findOneAndUpdate({email:email,product:product},{email,product,quantity},{upsert :true, new: true})
            
                        response.status = 200;
                        response.message = 'success';
                        return callback(null, response);  
                }
                catch (err) {
                    console.error(err.message);
                    response.status = 500;
                    response.message = 'Server Error';
                    return callback(null, response);
                }

            }
            else{
            const data = {
                giftoption : false,
                giftdescription : null,
            }
            const {giftoption,giftdescription} = data;
            cart = new Cart({
                email,
                product,
                productname,
                image_URL,
                quantity,
                price,
                shopname,
                giftoption,
                giftdescription
             
           });
           await cart.save();
                response.status = 200;
                response.message = 'success';
                return callback(null, response); 
        }
    } catch (err) {
        console.error(err.message);
        response.status = 500;
        response.message = 'Server Error';
        return callback(null, response);
    }
}
    

exports.handle_request = handle_request;