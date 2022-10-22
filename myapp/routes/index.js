var express = require('express');
var router = express.Router();
const axios = require('axios');


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
  console.log(":: req.body :: ", req.body);
  res.redirect('/login')
});

module.exports = router;
  