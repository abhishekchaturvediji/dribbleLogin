var express = require('express');
var router = express.Router();
const axios = require('axios');
const Models = require('../models/index')

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

router.post('/login', function(req, res) {
  res.redirect('/login')
});

router.get('/homepage', function(req, res) {
  res.render('home')
});

router.post('/homepage', function(req, res) {
  res.render('home', {email : req.body.email , password : req.body.password})
});



router.get('/three', function(req, res) {
  res.render('three')
});

module.exports = router;
  