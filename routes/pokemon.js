const express = require('express');
const router = express.Router();
const pokeCtrl = require('../controllers/pokemon');
const isLoggedIn = require('../config/auth');

router.get('/new', isLoggedIn, pokeCtrl.new);
router.post('/', isLoggedIn, pokeCtrl.create);
router.get('/:id', pokeCtrl.show);
router.get('/', pokeCtrl.index);
router.get('/:id/edit', pokeCtrl.edit);
router.put('/:id', pokeCtrl.update);
router.delete('/:id', pokeCtrl.delete);

module.exports = router;