const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moveSchema = new Schema ({
    move: String,
})

const pokeSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
    },
    nickname: String,
    apiId: String,
    type: String,
    level: Number,
    sprite: String,
    moves: [moveSchema]
});

module.exports = mongoose.model('Pokemon', pokeSchema);