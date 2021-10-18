var express = require('express');
var router = express.Router();
const passport = require('passport');
const fetch = require('node-fetch');
const rootURL = 'https://pokeapi.co/api/v2';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/',
    failureRedirect : '/'
  }
));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/', function(req, res, next) {
  
}) 


module.exports = router;
