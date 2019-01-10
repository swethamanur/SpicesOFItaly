const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema ({
    category :{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },

    name : {
        type: String,
        required: true,
        minlength : 5
    },
    description: {
        type: String,
        required: true,
        minlength: 10
    },

    nutrionalFacts : {
        "Calories" : Number,
        "Fat(g)": Number,
        "Sodium(mg)" : Number
    },
    price: {
        type:  Number,
        required: true
    }
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = {
    Menu
}