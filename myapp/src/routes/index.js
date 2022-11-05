var express = require('express');
var router = express.Router();
const axios = require('axios');
const { RavRegisteredUser , UserTweets } = require('../models/index')

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

router.get('/tweet', function(req, res) {
  
  UserTweets.findAll()
    .then(data => {
      // console.log(":: data :; ", data);
      res.render('tweet', {AllTweet : data})
    })
    .catch(err =>{
      console.log("err :: ", err);
    })

});

// let tweets = [];
router.post('/add-tweet',function(req, res) {

  console.log("req.body :: ", req.body);

  UserTweets.create({
    tweets : req.body.tweet
  })
  .then(data =>{
    console.log(": data created :");
    console.log(":: data ::", data);
    res.redirect('tweet')
  })
  .catch(err =>{
    console.log(": data err :");
    console.log(":: err :: ", err);
  })

});


router.get('/delete-tweet', function(req, res) {
  
  let primartId = req.query.id; 
  UserTweets.destroy({
    where: {
     id : primartId
    }
  })
    .then(data => {
      res.redirect('/tweet')
    })
    .catch(err =>{
      console.log("err :: ", err);
    })

});

module.exports = router;
  