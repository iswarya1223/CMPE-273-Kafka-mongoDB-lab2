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
var kafka = require('../../kafka/client');
router.use(express.urlencoded({extended: true}));
router.use(express.json())
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {secret} = require('../../utils/config');
const {auth} = require('../../utils/passport');
auth();
const connectDB = require('../../config/db');
//var User =require('../../models/User');
const config = require('config');
connectDB();
//app.use(express.json({extended: false}));

//For route use  GET api/users
//router.get('/',(req,res) => res.send('User Route'));

/*
var connection = mysql.createPool({
    host: constraints.DB.host,
    user:constraints.DB.username,
    password: constraints.DB.password,
    port: constraints.DB.port,
    database: constraints.DB.database
});
*/




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
      if(results.status === 500 || results.status === 400){
      res.send(results.message);
      }
      else{
      res.end (results.message);
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