const express = require('express');
const router = express.Router();
const pokeCtrl = require('../controllers/pokemon');
const isLoggedIn = require('../config/auth');

router.get('/new', isLoggedIn, pokeCtrl.new);
router.post('/', isLoggedIn, pokeCtrl.create);
router.get('/:id', isLoggedIn, pokeCtrl.show);
router.get('/', isLoggedIn, pokeCtrl.index);
router.get('/:id/edit', isLoggedIn, pokeCtrl.edit);
router.put('/:id', isLoggedIn, pokeCtrl.update);
router.delete('/:id', isLoggedIn, pokeCtrl.delete);

module.exports = router;