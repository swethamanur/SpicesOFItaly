const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema ({
    category: {
        type: String,
        required: true,
        //TODO- menus will be the array of all the menu items belonging to this category
        //menus : [{type: Schema.Types.ObjectId, ref: 'Menu'}];
    }
});

const Category = mongoose.model('Category',categorySchema);

module.exports = {
    Category
}