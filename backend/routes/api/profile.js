const express = require('express');
const router = express.Router();
const session = require('express-session');
var mysql = require('mysql');
//var constraints = require("../../config.json");
var cors = require('cors');
const {check, validationResult} = require('express-validator');
//const app = express();
router.use(cors());
var kafka = require('../../kafka/client');
const User = require('../../models/User');
const Cart = require('../../models/Cart');
const e = require('express');
router.use(express.urlencoded({extended: true}));
router.use(express.json())
const connectDB = require('../../config/db');

const config = require('config');
connectDB();
const {checkAuth} = require("../../utils/passport");

//app.use(express.json({extended: false}));

//For route use  GET api/users
//router.get('/',(req,res) => res.send('User Route'));


//For route use  GET api/profile

router.post('/me',(req,res) => {
    console.log("hi");
console.log(req.body);
const {email} = req.body;
 console.log(email);
try{  
    connection.query(`SELECT * FROM users WHERE email=?`,email,  
    function(error,results){
    console.log(results);
    if(results.length !== 0){
        res.send(JSON.stringify(results));
     }else{
        res.send("failure");
     }
 });
}
catch(err){
    console.error(err.message);
    res.send("server error");
}
}
);

router.post('/changeprofile'
  , async (req,res) => {
    //console.log(req.body);
    const {email,uname,city,gender,dateofbirth,mobile,address,country,picture} = req.body;
    kafka.make_request('updateuserprofile',req.body, function(err,results){
        // console.log(results);
               if(results.status === 400 || results.status === 500 ){
                 res.status(results.status).json(results.message);
                  }
                  
                  else{
                     res.status(200).json(results);
                  }
              }); 
 
   }
   );

   router.post('/addgiftoption'
  , async (req,res) => {
    console.log(req.body);
    kafka.make_request('addgiftop',req.body, function(err,results){
        // console.log(results);
               if(results.status === 400 || results.status === 500 ){
                 res.status(results.status).json(results.message);
                  }
                  
                  else{
                     res.status(200).json(results.message);
                  }
              }); 
 
   }
   );

router.post('/addgiftdescription'
  , async (req,res) => {
    console.log(req.body);
    kafka.make_request('addgiftdesc',req.body, function(err,results){
        // console.log(results);
               if(results.status === 400 || results.status === 500 ){
                 res.status(results.status).json(results.message);
                  }
                  
                  else{
                     res.status(200).json(results.message);
                  }
              }); 
 
   }
   );
//display the product details based on the products given in the search query
router.post('/getSearchDetails', [
], async (req,res) => {
    console.log("in backend");
    console.log(req.body);
    const resultPerPage = 5;
    var productsCount = 0;
    const {min_price,max_price,sortType,outOfStock} = req.body
    console.log(min_price,max_price);
    kafka.make_request('searchproducts',[req.body,req.query], function(err,results){
        // console.log(results);
               if(err ){
                 res.status(results.status).json(results.message);
                  }
                  
                  else{
                     res.status(200).json(results);
                  }
              }); 
 
   }
);

// getting the particular product details
router.get('/getProductDetails', [
], async (req,res) => {
    
    console.log("into backend single product");
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){

    return res.status(500).json({errors: errors.array()});
    }
    kafka.make_request('getproductdetail',req.query, function(err,results){
               if( results.status===400 || results.status===500){
                 res.status(results.status).json(results.message);
                  }
                  
                  else{
                     res.status(200).json(results);
                  }
              }); 
 
            });

//adding the cart details
router.post('/addtocart'
  , async (req,res) => {
    //if (!req.session.user) {
      //  res.redirect('/login');
    //}
    console.log(req.body);
    // get current cart price and add this product price to it and generate cartprice
    const {email,productid,quantity,price,shopname} = req.body;
        
    kafka.make_request('additemstocart',req.body, function(err,results){
        console.log(results);
              if(results.status===400 || results.status===500){
                res.status(results.status).json(results.message);
                 }
                 
                 if (results.status===200) {
                    res.status(200).json(results.message);
                }
             });  
             
  }
);

// delete products from the cart
router.post('/deletefromcart'
  , async (req,res) => {
    console.log(req.body);
    // get current cart price and add this product price to it and generate cartprice
    const {productid,email} = req.body;
    kafka.make_request('deletecartitems',req.body, function(err,results){
        console.log(results);
              if(results.status===400 || results.status===500){
                res.status(results.status).json(results.message);
                 }
                 
                 if (results.status===200) {
                    res.status(200).json({success:true});
                }
             }); 
});

//my cart details
router.post('/getCartDetails'
  , async (req,res) => {
    console.log("email details",req.body);
    const {email} = req.body;
    kafka.make_request('getcartitems',req.body, function(err,results){
        console.log(results);
              if(err){
                res.status(results.status).json(results.message);
                 }
                 
                 else{
                    res.status(200).json(results);
                }
             }); 
}
);

// creating a order id in orders table after paying for products in the cart.
router.post('/orders'
  , async (req,res) => {
    console.log("emails is",req.body);
    //const {email,totalprice} = req.body;
    kafka.make_request('addorders',req.body, function(err,results){
        console.log(results);
              if(err){
                res.status(results.status).json(results.message);
                 }
                 
                 else{
                    res.status(200).json({success : 'true'});
                }
             }); 
}
);


// fetching the orders made by a particular end user.
router.post('/mypurchases'
  , async (req,res) => {
   // console.log(req.body);
   kafka.make_request('getuserorders',req.body, function(err,results){
    console.log(results);
          if(err){
            res.status(results.status).json(results.message);
             }
             
             else{
                res.status(200).json(results);
            }
         }); 
}
);

router.post('/addfavourite', [
], async (req,res) => {
    //console.log(req.body);
    const errors = validationResult(req);
    //console.log(errors);
    if(!errors.isEmpty()){
    //res.send(errors.code);
    return res.status(500).json({errors: errors.array()});
    }
    kafka.make_request('addfavproducts',req.body, function(err,results){
        console.log(results)
        if(results.status=== 500){
            res.send("database error");
        }
        if(results.status=== 200){
            res.status(200).json("success");
        }
        
    }); 
  
}
);

router.post('/getfavourite', [
], async (req,res) => {
    //console.log(req.body);
    const errors = validationResult(req);
    //console.log(errors);
    if(!errors.isEmpty()){
    //res.send(errors.code);
    return res.status(500).json({errors: errors.array()});
    }
    kafka.make_request('getfavproducts',req.body, function(err,results){
        console.log(results);
              if(err){
                res.status(results.status).json(results.message);
                 }
                 
                 else{
                    res.status(200).json(results);
                }
             }); 
}
);

router.post('/deletefavourite', [
], async (req,res) => {
    console.log(req.body);
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
    //res.send(errors.code);
    return res.status(500).json({errors: errors.array()});
    }

    kafka.make_request('deletefavproducts',req.body, function(err,results){
        console.log(results);
              if(results.status===400 || results.status===500){
                res.status(results.status).json(results.message);
                 }
                 
                 if (results.status===200) {
                    res.status(200).json({success:true});
                }
             });    

}
);

// changing the currency
router.post('/changecurrency'
  , async (req,res) => {
    console.log(req.body);
    const {currency} = req.body;
    try{  
        connection.query(`UPDATE products set currency=?`,[currency], function(error,results){
        //console.log(results);
        if(error){
            res.send("failure");
           
         }else{
            res.status(200).json({
                success: true,
              });
         }
        
     });
    }
    catch(err){
        console.error(err.message);
        res.send("server error");
    }
}
);
module.exports = router;