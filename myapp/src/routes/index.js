var express = require('express');
var router = express.Router();
const axios = require('axios');
// const { RavRegisteredUser , UserTweets } = require('../models/index')

const {userRegister} = require("../controller/userController")

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(readableData => {
      res.render('index',{ title : 'ARVS' , cardInfo : readableData.data});
  })   
});

router.get('/login', function(req, res, next) {
  res.render('login',{ title : 'Login' });
});

router.get('/register', function(req, res, next) {
  res.render('register');
});


router.post('/register-user',userRegister);


module.exports = router;