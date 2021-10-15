const express = require('express');
const router = express.Router();
const pokeCtrl = require('../controllers/pokemon');
const isLoggedIn = require('../config/auth');

router.get('/new', isLoggedIn, pokeCtrl.new);
router.post('/', isLoggedIn, pokeCtrl.create);

module.exports = router;