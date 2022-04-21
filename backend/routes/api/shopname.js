const express = require('express');
const router = express.Router();
const session = require('express-session');
var mysql = require('mysql');
//var constraints = require("../../config.json");
var cors = require('cors');
const {check, validationResult} = require('express-validator');
//const app = express();
router.use(cors());
const User = require('../../models/User');
const e = require('express');
//const ApiFeatures = require("../utils/apifeatures");
router.use(express.urlencoded({extended: true}));
router.use(express.json())
//app.use(express.json({extended: false}));

//For route use  GET api/users
//router.get('/',(req,res) => res.send('User Route'));


var connection = mysql.createConnection({
    host: 'localhost',
    database: 'etsy',
    port: '3306',
    user: 'root',
    password: 'password',
});
connection.connect((err) => {
    if(err){
        throw 'Error occured ' + err;
    }
    //console.log("pool created");
});


router.post('/uniqueshopname', [
    check('shopname', 'shop name is required').not().isEmpty(),
  ], async (req,res) => {
      //console.log(req.body);
      const errors = validationResult(req);
      //console.log(errors);
      if(!errors.isEmpty()){
      //res.send(errors.code);
      return res.status(500).json({errors: errors.array()});
      }
      const {shopname} = req.body;
      try{  
          connection.query(`SELECT shopname FROM users WHERE shopname=?` ,[shopname
          ],  function(error,results){
        //      console.log(results);
              if(results.length === 0){
                res.status(200).json({success: true});
                
                       }      
              else{
                
                res.status(200).json({success: 'false'});
                  //console.log("Restaurant already existed!");
              }
          });
          
      }
      catch(err){
          //console.error(err.message);
          res.send("server error");
      }
  }
  );

  router.post('/createshop', [
    check('shopname', 'shop name is required').not().isEmpty(),
  ], async (req,res) => {
      //console.log("shop data",req.body);
      const errors = validationResult(req);
      //console.log(errors);
      if(!errors.isEmpty()){
      //res.send(errors.code);
      return res.status(500).json({errors: errors.array()});
      }
      const {shopname,email} = req.body;
      try{  
                  connection.query(`UPDATE users set shopname=? where email=?`,[shopname,email
                      ],  function(error,results){
                    if(error){
                           //res.send(error.code);
                           res.send("failure");
                       }else{
                           //res.end(JSON.stringify(results));
                           res.status(200).json({success: 'true'});
                       }
                   });
              }      
      catch(err){
          console.error(err.message);
          res.send("database error");
      }
  }
  );

  router.get('/getShopDetails/:shopname', [
], async (req,res) => {
    console.log(req.params);
    const {shopname} = req.params;

    try{  
        connection.query(`Select * FROM products P
         WHERE P.shopname=?;` ,[shopname]
        ,  function(error,results){
            console.log(results);
            if (results.length ===0) {
                connection.query(`SELECT U.shopimage,U.uname,U.email FROM users U
                WHERE U.shopname=?;` ,[shopname],  function(error,results){
                    if(results.length !== 0){
                        res.status(200).json({success: true,results});
                     }else{
                        res.send("failure");
                     }    
            })
        }else {
        connection.query(`SELECT U.shopimage,U.uname,U.email,P.* FROM users U,products P
         WHERE U.shopname=? and P.shopname=?;` ,[shopname,shopname
        ],  function(error,results){
            connection.query(`SELECT sum(price * quantity) as totalsalesrevenue
             from orderdetails where shopname=?;`,[shopname],function(error1,results1){
            console.log(results);
            console.log(results1);
              if(results.length !== 0 && results1.length !== 0){
                  res.status(200).json({success: true,results,results1});
               }else{
                  res.send("failure");
               }
           });
          })
        }
    });
}
          catch(err){
              console.error(err.message);
              res.send("server error");
          }
       }
       );

router.post('/createproduct', [
        check('productname', 'product name is required').not().isEmpty(),
        check('description', 'product description is required').not().isEmpty(),
        check('price', 'price is required').not().isEmpty(),
        check('category', 'category is required').not().isEmpty(),
        check('stock', 'stock is required').not().isEmpty(),
        check('currency','currency is required').not().isEmpty(),
        check('image_URL','image_url is required').not().isEmpty(),
        
      ], async (req,res) => {
          console.log(req.body);
          const errors = validationResult(req);
          console.log(errors);
          if(!errors.isEmpty()){
          //res.send(errors.code);
          return res.status(500).json({errors: errors.array()});
          }
          const {productname,description,price,category,stock,image_URL,shopname,currency} = req.body;
          try{  
                      connection.query(`Insert into products(productname,description,price,category,stock,image_URL,shopname,currency) values(?,?,?,?,?,?,?,?)`,[productname,description,price,category,stock,image_URL,shopname,currency
                          ],  function(error,results){
                        if(error){
        
                               //res.send(error.code);
                               res.status(400).json({success: false});
                           }else{
                               //res.end(JSON.stringify(results));
                               res.status(200).json({success: true});
                           }
                       });
                  }      
          catch(err){
              console.error(err.message);
              res.send("database error");
          }
      }
      );

// owner editing the product details
router.post('/updateproduct'
  , async (req,res) => {

    const {productid,productname,description,price,category,stock,image_URL,currency} = req.body;
    try{  
        connection.query(`UPDATE products set productname=?,description=?,price=?,category=?,stock=?,image_URL=?,currency=? where productid=?`,[productname,description,price,category,stock,image_URL,currency,productid],  function(error,results){
            if(error){
        
                //res.send(error.code);
                res.status(400).json({success: false});
            }else{
                //res.end(JSON.stringify(results));
                res.status(200).json({success: true});
            }
     });
    }
    catch(err){
        console.error(err.message);
        res.send("server error");
    }
}
);
// shop admin deleting the products
router.post('/deleteproductfromshop'
  , async (req,res) => {
    console.log(req.body);
    const {productid} = req.body;
    try{         
            connection.query(`Delete from products where productid = ?`,[productid],function(error,results){
           connection.query(`Delete from cart where productid = ?`,[productid],function(error,results){
        connection.query(`Delete from favorites where productid = ?`,[productid],function(error,results){
        if(error){
            res.status(400).json({
                success: false,
              });
         }else{
            res.status(200).json({
                success: true,
              });
         }

})})})

    }
    catch(err){
        console.error(err.message);
        res.send("server error");
    }
});


router.post('/saveshopimage', [
    
  ], async (req,res) => {
      console.log(req.body);
      const {shopimage,email} = req.body;
      try{  
                  connection.query(`UPDATE users SET shopimage=? where email=? `,[shopimage,email
                      ],  function(error,results){
                    if(error){
    
                           //res.send(error.code);
                           res.status(400).json({success: false});
                       }else{
                           //res.end(JSON.stringify(results));
                           res.status(200).json({success: true});
                       }
                   });
              }      
      catch(err){
          console.error(err.message);
          res.send("database error");
      }
  }
  );

  router.post('/getshopcategory', [
    
], async (req,res) => {
    console.log(req.body);
    const {shopname} = req.body;
    try{  
                connection.query(`SELECT category from etsy.categories where shopname = ? or shopname = "NULL" `,[shopname
                    ],  function(error,results){
                  if(error){
  
                         //res.send(error.code);
                         res.status(400).json({success: false});
                     }else{
                         //res.end(JSON.stringify(results));
                         res.status(200).json({success: 'true',results});
                     }
                 });
            }      
    catch(err){
        console.error(err.message);
        res.send("database error");
    }
}
);

router.post('/shopcategory', [
    
], async (req,res) => {
    console.log(req.body);
    const {shopname,category} = req.body;
    try{  
                connection.query(`INSERT INTO categories(shopname,category) values(?,?) `,[shopname,category
                    ],  function(error,results){
                  if(error){
  
                         //res.send(error.code);
                         res.status(400).json({success: false});
                     }else{
                         //res.end(JSON.stringify(results));
                         res.status(200).json({success: 'true'});
                     }
                 });
            }      
    catch(err){
        console.error(err.message);
        res.send("database error");
    }
}
);

  module.exports = router;