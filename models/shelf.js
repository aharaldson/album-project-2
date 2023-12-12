const mongoose = require('mongoose');

const shelfSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    albums: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album',
    }],
});

const shelf = mongoose.model('shelf', shelfSchema);

module.exports = shelf;