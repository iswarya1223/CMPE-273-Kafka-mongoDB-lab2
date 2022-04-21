const Favourite = require('../models/Favourite');
const config = require('config');
const connectDB = require('../config/db');
const product = require("../models/productModel");

connectDB();

async function handle_request(msg, callback){
  
    var response = {};
      
    try{  
        var {favkeyword,email}=msg
    if (favkeyword === "undefined") {
        var favkeyword= ''
    }
        let query = [
            {
                $lookup:
                {
                    from:"products",
                    localField: "product",
                    foreignField : "_id",
                    as: "productdetails"
                }
            },
            {$unwind: '$productdetails'},
        ];
        if (favkeyword && favkeyword!='')
        {
            query.push({
                $match: {
                    $and : [
                        {
                            'productdetails.productname' : {$regex: favkeyword,$options: "i"}
                        },
                        {
                            email
                        }
                    ]
                }
            });
        }
        else
        {
            query.push({
                $match: {
                    $and : [
                        {
                            email
                        }
                    ]
                }
            });
        }
        let favorites = await Favourite.aggregate(query);
     
        response.status = 200;
        response.message = 'true';
        return callback(null,{success:true, favorites});

                     }    
         catch (err) {
        console.error(err.message);
        response.status = 500;
        response.message = 'Server Error';
        return callback(err, response);
    }
}
    

exports.handle_request = handle_request;