const express = require('express');
const router = express.Router();
const session = require('express-session');
var mysql = require('mysql');

var cors = require('cors');
const {check, validationResult} = require('express-validator');

router.use(cors());
const User = require('../../models/User');
const e = require('express');
var kafka = require('../../kafka/client');
router.use(express.urlencoded({extended: true}));
router.use(express.json())
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {secret} = require('../../utils/config');
const {auth} = require('../../utils/passport');
auth();
const connectDB = require('../../config/db');

const config = require('config');
connectDB();




router.post('/', [
  check('uname', 'Name is required').not().isEmpty(),
  check('email', 'Please enter a valid email').isEmail(),
  check('password','password should be minimum of length 6 charcaters').isLength({min: 6}),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    kafka.make_request('register',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      if(results.status === 500 || results.status === 400 || err){
      res.send(results.message);
      }
      else{
      res.send (results.message);
      }
      
  });
  }
);
router.post('/login', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password','password is required').exists()
  ], async (req,res) => {

    console.log(req.body);
    const errors = validationResult(req.body);
    if(!errors.isEmpty()){

        return res.status(500).json({errors: errors.array()});
    }
    const {email,password} = req.body;
    kafka.make_request('login',req.body, function(err,results){
        if(results.status === 200 ){
          res.status(200).send(results.message);
        }
        else{
          res.status(results.status).send(results.message);
        }
        
    });
  });

module.exports = router;