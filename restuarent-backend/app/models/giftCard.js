const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt  = require('bcryptjs');


const giftCardSchema = new Schema({
    cardNumber : {
        type: String,
        //required: true,
        unique: true
    },
    balance: {
        type: Number,
        default: 0
    },
    amount:{
        type: Number,
        enum: [50,10,25,75,100,250],
        required: true
    },
    message:{
        type: String,
        maxlength: 1000
    },
    quantity: {
        type: Number,
        default: 1,
        required: true
    },
    cardType:{
        type: String,
        enum: ['All','General','Birthday','Dinner + Movie','Occasion'],
        required: true
    },
    user : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});


giftCardSchema.methods.generateCardNumber = function(){
    let card = this;
    bcrypt.genSalt(10).then((salt) =>{
        bcrypt.hash(String(card.user),salt).then((cardNum) =>{
            
            card.cardNumber = cardNum.slice(0,17);
            return card.save().then((card) =>{
                return card;
            })
        }).catch((err) =>{
            console.log(err);
        })
    }).catch((err) =>{
        console.log(err);
    })
    
    
}

const GiftCard = mongoose.model('GiftCard',giftCardSchema);

module.exports = {
    GiftCard
}