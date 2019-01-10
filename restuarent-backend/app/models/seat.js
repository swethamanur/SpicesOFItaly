const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seatSchema = new Schema({
    seatNumber: {
        type: Number,
        required: true,
        unique: true
    },
    vacant: {
        type: Boolean,
        default: true,
        required: true
    },
    seatType: {
        type: String,
        enum: ['Adults','Kids'],
        default: 'Adults',
        required: true
    }
});

const Seat = mongoose.model('Seat',seatSchema);

module.exports = {
    seatSchema,
    Seat
}