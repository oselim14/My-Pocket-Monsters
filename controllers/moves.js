const Pokemon = require('../models/pokemon');
const axios = require('axios');
const { map } = require('../server');
const rootURL = 'https://pokeapi.co/api/v2';

module.exports = {
    create,
    new: newMove,
    addToPokemon,
};

function addToPokemon(req, res) {
    Pokemon.findById(req.params.pokeId, function (err, pokemon) {
        pokemon.moves.push(req.body.moveId);
        pokemon.save(function (err) {
            res.redirect(`/pokemon/${pokemon._id}`);
        })
    })
}

async function create(req, res) {
    const poke = await Pokemon.findById(req.params.id);
    poke.moves.push({ move: req.body.move });
    await poke.save();
    res.redirect(`/pokemon/${req.params.id}`);
}

async function newMove(req, res) {
    const pokemon = await Pokemon.findById(req.params.id);
    const apiPokemon = await axios.get(`${rootURL}/pokemon/${pokemon.name}`);
    let moves = apiPokemon.data.moves.map(m => m.move.name);
    moves = moves.filter(m => !pokemon.moves.some(pm => pm.move === m));
    res.render('moves/new', { pokemon, moves });
}

