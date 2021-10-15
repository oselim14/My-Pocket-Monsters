const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pokeSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    type: String,
    // moves: [movesSchema],
    level: Number,
});

module.exports = mongoose.model('Pokemon', pokeSchema);