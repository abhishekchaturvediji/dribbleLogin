const { RavRegisteredUser , UserTweets } = require('../models/index')

module.exports = {

    createTweet : async(req,res) =>{
        UserTweets.findAll()
        .then(data => {
          // console.log(":: data :; ", data);
          res.render('tweet', {AllTweet : data})
        })
        .catch(err =>{
          console.log("err :: ", err);
        })
    }

}