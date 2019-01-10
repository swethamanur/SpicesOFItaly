const express = require('express');
const router = express.Router();
const _ = require('lodash');

const {User} = require('../models/user');
const {authenticateUser,authorizeUser} = require('../middlewares/authentication');
const {validateId} = require('../middlewares/utilities');

//POST AKA Registration of a new user
router.post('/',(req,res) =>{
    let body = _.pick(req.body,['username','email','password','address','contactNumber']);
    let user = new User(body);
    
    user.save().then((user) => {
        
        return user.generateToken();
        
    }).then((token) => {
        
        res.header('x-auth',token).send(user.shortInfo());
        
    }).catch((err) => {
       
        res.send(err);
    })
    
});

//DELETE AKA Logout of a user from a session
router.delete('/',authenticateUser,(req,res) =>{
    let user = req.locals.user;
    let activeToken = req.locals.token;

    let inDBToken = user.tokens.find((inDBToken) => {
        return inDBToken.token = activeToken;
    }) ;
    
    user.tokens.id(inDBToken).remove();

    user.save().then(() =>{
        res.send({
            notice: 'You succesfully logged out'
        });
    }).catch((err) =>{
        res.send(err);
    })
});

//READ orders of an user: /users/orders
router.get('/orders',authenticateUser,(req,res) => {
    let user = req.locals.user;
    if(user.orders.length == 0){
        res.send('Your have no orders!')
    }else{
        res.send(user.orders);
    }
    
})

//POST aka adding an order
router.post('/orders',authenticateUser,(req,res) =>{
    let user = req.locals.user;
    let body = _.pick(req.body,['quantity','menu','restaurent']);

    let newOrder = new Order(body);

    user.orders.push(newOrder);

    user.save().then(() => {
        res.send({
            notice: 'Succesfully added your order to the cart!',
            order: newOrder
        }).catch((err) => {
            res.send(err);
        })
    })
});

//UPDATE an order
router.put('/orders/:id',validateId,authenticateUser,(req,res) =>{
    let orderId = req.params.id;
    let user = req.locals.user;
    let body = _.pick(req.body,['quantity']);

    let order = user.orders.find((InDBOrder) => {
        return InDBOrder.equal(orderId);
    });

    order.quantity = body;

    user.save().then((order)=>{
        res.send({
            order,
            notice: 'Your order was succesfully updated'
        }).catch((err) =>{
            res.send(err);
        })
    })
    
    

})

//DELETE an order
router.delete('/orders/:id',validateId,authenticateUser,(req,res) =>{
    let orderId = req.params.id;
    let user = req.locals.user;

    user.orders.id(orderId).remove();

    user.save().then(() =>{
        res.send({
            notice: 'Succesfully deleted your order! would you like to order any?'
        }).catch((err) =>{
            res.send(err);
        })
    })
})

module.exports = {
    usersController : router
}


