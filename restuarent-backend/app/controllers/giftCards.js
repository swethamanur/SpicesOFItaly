const express = require('express');
const router = express.Router();
const _ = require('lodash');

const {GiftCard} = require('../models/giftCard');
const {authenticateUser,authorizeUser} = require('../middlewares/authentication');

//POST aka create a gift card

router.post('/',authenticateUser,(req,res) =>{
    let user = req.locals.user;
   let body = _.pick(req.body,['cardType','quantity','amount','message','cardNumber']);
  
    let giftCard = new GiftCard(body);
    giftCard.user = user._id;
   
    giftCard.save().then((card) =>{
        
        return card.generateCardNumber();
    }).then((card) =>{
        
        res.send({
            card,
            notice: 'You just created a new gift card! Congratulations!!'
        })
    }).catch((err) =>{
        res.send(err);
    })
});

module.exports = {
    giftCardsController : router
}