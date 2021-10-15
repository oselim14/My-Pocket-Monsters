const Pokemon = require('../models/pokemon');

module.exports = {
    create,
    new: newPoke,
}

function create(req, res) {
    const pokemon = new Pokemon(req.body);
    pokemon.save(function(err) {
        if (err) return res.render('pokemon/new');
        res.redirect(`/pokemon/${pokemon._id}`);
    })
}

function newPoke(req, res) {
    res.render('pokemon/new');
}