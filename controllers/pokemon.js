const Pokemon = require('../models/pokemon');
const rootURL = 'https://pokeapi.co/api/v2';
const axios = require('axios');


module.exports = {
    create,
    new: newPoke,
    show,
    index,
    edit,
    update,
    delete: deletePoke,

}

async function create(req, res) {
    const name = req.body.name.toLowerCase();
    let poke = await Pokemon.findOne({ name, user: req.user._id });
    if (poke) return res.render('pokemon/new', { message: 'Existing Pokemon' });
    try {
        const pokemon = await axios.get(`${rootURL}/pokemon/${name}`);
        req.body.type = pokemon.data.types[0].type.name;
        req.body.sprite = pokemon.data.sprites.front_default;
        req.body.user = req.user._id;
        poke = await Pokemon.create(req.body);
    } catch (e) {
        return res.render('pokemon/new', { message: 'Invalid Name' });
    }
    res.redirect('/pokemon');



    // const poke1 = new Pokemon(req.body);
    // poke1.save(function(err) {
    //     if (err) return res.render('home');
    //     req.user.starterPokemon = poke1;
    //     req.user.save(function(err){
    //         console.log(req.user);
    //         res.redirect(`/pokemon`);
    //     });
    // });
}

async function newPoke(req, res) {
    res.render('pokemon/new', { message: '' });
}

function show(req, res) {
    Pokemon.findById(req.params.id, function (err, pokemon) {
        res.render('pokemon/show', { pokemon })
    })
}

function index(req, res) {
    Pokemon.find({user: req.user._id}, function (err, pokemon) {
        res.render('pokemon/index', { pokemon });
    });
}

function edit(req, res) {
    Pokemon.findById(req.params.id, function (err, pokemon) {
        if (err) {
            res.redirect(`/pokemon/${req.params.id}`);
        }
        res.render('pokemon/edit', {
            pokemon,
            title: "Edit Starter",
        });
    });
}

async function update(req, res) {
    req.body.onTeam = !!req.body.onTeam;
    Pokemon.findOneAndUpdate({_id: req.params.id, user: req.user._id}, req.body, {new: true}, function (err, pokemon) {
        if (err || !pokemon) {
            return res.redirect(`/pokemon/${pokemon._id}/edit`);
        }
        res.redirect(`/pokemon/${pokemon._id}`);
    })
}

function deletePoke(req, res) {
    Pokemon.findByIdAndDelete(req.params.id, function (err) {
        res.redirect('/pokemon');
    });
}