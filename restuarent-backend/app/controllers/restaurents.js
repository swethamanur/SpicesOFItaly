const express = require('express');
const router = express.Router();
const _ = require('lodash');

const {Restaurent} = require('../models/restaurent');
const {seatSchema,Seat} = require('../models/seat');
const {authenticateUser, authorizeUser} = require('../middlewares/authentication');
const {validateId} = require('../middlewares/utilities');

//GET all restuarents

router.get('/',(req,res) => {
    Restaurent.find().then((restaurents) => {
        res.send(restaurents);
    }).catch((err) => {
        res.send(err);
    })
});

//GET  a restaurent by its id
router.get('/:id',(req,res) =>{
    let id = req.params.id;
    Restaurent.findById(id).then((restaurent) =>{
        res.send(restaurent);
    }).catch((err) =>{
        res.send(err);
    })
});

//POST or add a new restaurent

router.post('/',authenticateUser,authorizeUser,(req,res) => {
    let body = _.pick(req.body,['name','address','contactNumber','timings','waitTime','facilities','seats']);
    let restaurent  = new Restaurent(body);
    

    //using an instance method way:
    // restaurent.save().then((restaurent) =>{
    //     console.log('1. before generating the seats in the post function');
    //     return restaurent.generateSeats();   
    // }).then((restaurentSeats)=>{
    //     console.log('5. came to the post function');
    //     res.send({
    //         restaurent : restaurentSeats,
    //         notice: 'You successfully added a new restaurent!'
    //     });
    // }).catch((err) =>{
    //     res.send(err);
    // })

    for (let i =1; i< 11; i++){
        let seat = new Seat({seatNumber:i});
        restaurent.seats.push(seat);
    };

    //saving the parent document will automatically save the sub document
    restaurent.save().then((restaurent) =>{
        res.send({
        restaurent,
        notice: 'Add some seats to your new restaurent!'});
    }).catch((err) =>{
        res.send(err);
    })
});

//UPDATE  a restaurent
router.put('/:id',validateId,authenticateUser,authorizeUser,(req,res) =>{
    let id = req.params.id;
    let body = _.pick(req.body,['address','name','contactNumber','timings', 'waitTime','facilities']);

    Restaurent.findByIdAndUpdate({_id: id},{$set: body}, {new: true, runValidators: true}).then((restaurent) =>{
        res.send({
            restaurent,
            notice: 'You successfully updated the restaurent!'
        })
    }).catch((err) =>{
        res.send(err);
    })
});

//DELETE a restaurent
router.delete('/:id',validateId,authenticateUser,authorizeUser,(req,res) => {
    let id = req.params.id;
    Restaurent.findByIdAndDelete(id).then((restaurent) =>{
        res.send({
            restaurent,
            notice: 'You succesfully deleted the restaurent!'
        })
    }).catch((err) =>{
        res.send(err);
    })
});



module.exports = {
    restaurentsController : router
}