const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//why dont we need to require it here? the User model, how is the id getting craeted.

//Note: every user will have an order cart, so orderSchema becomes a child schema for the parent 'User'
const orderSchema = new Schema({
    
    //price details and name of the food needs to be extrected from here
    menu :{
        type: Schema.Types.ObjectId,
        //required: true,
        ref: 'Menu'
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    restaurent: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Restuarent'
    },
    orderReceiptNo : {
        type: String,
        required: true,
        unique: true
    },

    orderDate : {
        type: Date,
        default: Date.now,
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = {
    Order,
    orderSchema
}


//doubt:

/*
Should restaurent also have orderSchema as child schema? bec every restaurent will have orders;
likewise, every user also has orders!
*/
