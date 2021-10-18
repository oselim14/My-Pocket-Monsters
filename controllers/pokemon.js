const Pokemon = require('../models/pokemon');
const fetch = require('node-fetch');
const rootURL = 'https://pokeapi.co/api/v2';


module.exports = {
    create,
    new: newPoke,
    show,
    index,
    edit,
    update,
    delete: deletePoke,
}

function create(req, res) {
    const name = req.body.name;
    if (!name) return res.render('index');
    const pokemon = fetch(`${rootURL}/pokemon/${name}`)
        .then(res => res.json())
        .then(poke => {
            pokeData = poke
            return fetch(pokeData.type);
        }).then(res => res.json())
        .then(sprites =>{
            pokeData.sprites = sprites;
            res.render('index', {pokeData})
        })
    // const pokemon = new Pokemon(req.body);
    // pokemon.save(function(err) {
    //     if (err) return res.render('pokemon/new');
    //     res.redirect(`/pokemon/new`);
    // }
    console.log(pokemon)
  res.render('pokemon/new')
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

function update(req, res) {
    Pokemon.findOneAndUpdate({_id: req.params.id}, function(err, pokemon){
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