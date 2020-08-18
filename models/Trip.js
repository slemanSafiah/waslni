const mongoose = require('mongoose');
const {
    Number,
    Boolean,
    Date
} = mongoose.Schema.Types;

const tripSchema = mongoose.Schema({
    source_place: {
        type: String,
        required: true,
    },
    destination_place: {
        type: String,
        required: true,
    },
    whole_destince: {
        type: Number,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    is_finished: {
        type: Boolean,
        required: true,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
});

const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;