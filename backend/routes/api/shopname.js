const express = require('express');
const router = express.Router();
const session = require('express-session');
var mysql = require('mysql');

var cors = require('cors');
const {check, validationResult} = require('express-validator');

router.use(cors());
var kafka = require('../../kafka/client');
const User = require('../../models/User');
const e = require('express');

router.use(express.urlencoded({extended: true}));
router.use(express.json())
var Category=require('../../models/Category');






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
      kafka.make_request('shopnameunique',req.body, function(err,results){
        // console.log(results);
               if(results.status === 200 ){
                 res.status(results.status).json(results.message);
                  }
                  
                  else{
                     res.status(500).json(results.message);
                  }
              }); 
 
   }
   );

  router.post('/createshop', [
    check('shopname', 'shop name is required').not().isEmpty(),
  ], async (req,res) => {
     
      const errors = validationResult(req);

      if(!errors.isEmpty()){
 
      return res.status(500).json({errors: errors.array()});
      }
      kafka.make_request('createshopname',req.body, function(err,results){
        console.log(results);
              if(err){
                res.status(results.status).json(results.message);
                 }
                 
                 else{
                    res.status(200).json({success: true});
                }
             }); 

  }
  );

  router.get('/getShopDetails/:shopname', [
], async (req,res) => {
    console.log(req.params);
    const {shopname} = req.params;

    kafka.make_request('getshopdetails',req.params, function(err,results){
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

          return res.status(500).json({errors: errors.array()});
          }
          kafka.make_request('createproducts',req.body, function(err,results){
         
                   if(results.status === 400 || results.status === 500 ){
                     res.status(results.status).json(results.message);
                      }
                      
                      else{
                         res.status(200).json(results);
                     }
                  }); 
     
       }
       );

// owner editing the product details
router.post('/updateproduct/:productid'
  , async (req,res) => {

    const {productid,productname,description,price,category,stock,image_URL,currency} = req.body;
    kafka.make_request('updateproducts',[req.params,req.body], function(err,results){
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
// shop admin deleting the products
router.post('/deleteproductfromshop'
  , async (req,res) => {
    console.log(req.body);
  
    kafka.make_request('deleteproducts',req.body, function(err,results){
        // console.log(results);
               if(err ){
                 res.status(results.status).json(results.message);
                  }
                  
                  else{
                     res.status(200).json({success:true});
                 }
              }); 
   }
   );


router.post('/saveshopimage', [
    
  ], async (req,res) => {
      console.log(req.body);
      const {shopimage,email} = req.body;
    kafka.make_request('saveshopimage',req.body, function(err,results){
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


  router.post('/getshopcategory', [
    
], async (req,res) => {
    console.log(req.body);
    const {shopname} = req.body;
    kafka.make_request('getshopcategories',req.body, function(err,results){
        // console.log(results);
               if(results.status === 500 || results.status === 400){
                 res.status(results.status).json(results.message);
                  }
                  
                  else{
                     res.status(results.status).json(results.message);
                 }
              }); 
 
   }
   );
router.post('/shopcategory', [
    
], async (req,res) => {
    console.log(req.body);
    const {shopname,category} = req.body;
    kafka.make_request('addshopcategory',req.body, function(err,results){
        // console.log(results);
               if(results.status === 500 ){
                 res.status(results.status).json(results.message);
                  }
                  
                  else{
                     res.status(results.status).json(results.message);
                 }
              }); 
 
   }
   );

  module.exports = router;