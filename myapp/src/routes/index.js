var express = require('express');
var router = express.Router();
const axios = require('axios');
// const { RavRegisteredUser , UserTweets } = require('../models/index')

const { userRegister , userLogin } = require("../controller/userController")

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(readableData => {
      res.render('index',{ title : 'ARVS' , cardInfo : readableData.data});
  })   
});

router.get('/login', function(req, res, next) {

  const formValue =  req.flash('formValue');
  let error = req.flash('error');
  res.render('login',{ title : 'Login' , error , formValue});

});

router.get('/register', function(req, res, next) {

  const formValue =  req.flash('formValue');
  let error = req.flash('error');

  res.render('register',{error, formValue});

});

router.post('/register-user',userRegister);

router.post('/login-user', userLogin );

router.get('/tweet', function(req, res, next) {

  const formValue =  req.flash('formValue');
  let error = req.flash('error');

  console.log(": res.cookie : ",req.cookies['UserData']);

  res.render('tweet',{error, formValue});

});



module.exports = router;