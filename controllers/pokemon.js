const Pokemon = require('../models/pokemon');
// const fetch = require('node-fetch');
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
    const name = req.body.name;
    if (!name) return res.render("pokemon/index");
    const pokemon = await axios.get(`${rootURL}/pokemon/${name}`)
    req.body.type = pokemon.data.types[0].type.name;
    req.body.sprite = pokemon.data.sprites.front_default;

    const poke1 = new Pokemon(req.body);
    poke1.save(function(err) {
        if (err) return res.render('home');
        req.user.starterPokemon = poke1;
        req.user.save(function(err){
            console.log(req.user);
            res.redirect(`/pokemon`);
        });
    });
   } 

function newPoke(req, res) {
    res.render('pokemon/new');
}

function show(req, res) {
    Pokemon.findById(req.params.id, function(err, pokemon){
        res.render('pokemon/show', {pokemon})
    })
}

function index(req, res) {
    Pokemon.find({}, function(err, pokemon){
        res.render('pokemon/index', {pokemon});
    });
}

function edit(req, res) {
    Pokemon.findById(req.params.id, function(err, pokemon){
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
    const name = req.body.name;
    if (!name) return res.render("pokemon/index");
    const pokeData = await axios.get(`${rootURL}/pokemon/${name}`)
    req.body.type = pokeData.data.types[0].type.name;
    req.body.sprite = pokeData.data.sprites.front_default;
    Pokemon.findOneAndUpdate(req.params.id, req.body, function(err, pokemon){
        if (err) {
            res.render("pokemon/edit", { pokemon, title: "Edit Starter" });
          }
          res.redirect(`/pokemon/${pokemon._id}`);
    })
}

function deletePoke(req, res) {
    Pokemon.findByIdAndDelete(req.params.id, function(err){
        res.redirect('/pokemon');
    });
}