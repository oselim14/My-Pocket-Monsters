const express = require('express');
const router = express.Router();
const movesCtrl = require('../controllers/moves');

router.get('/pokemon/:id/moves/new', movesCtrl.new);
router.post('/pokemon/:id/moves', movesCtrl.create);
router.post('/pokemon/:pokeId/moves', movesCtrl.addToPokemon);

module.exports = router;