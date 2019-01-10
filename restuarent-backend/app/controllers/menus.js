const express = require('express');
const router = express.Router();
const _ = require('lodash');

const {Menu} = require('../models/menu');
const {authenticateUser,authorizeUser} = require('../middlewares/authentication');
const {validateId} = require('../middlewares/utilities');

//GET all the menus of a category
router.get('/:categoryId',(req,res) =>{
    let categoryId = req.params.categoryId;
    Menu.find({category: categoryId}).then((menus) =>{
        res.send(menus);
    }).catch((err) =>{
        res.send(err);
    })
});


//DO THIS
//GET a menu item belonging to a particular category
// router.get('/categories/:id',validateId,(req,res) =>{
//     let categoryId = req.params.categoryId;
//     Menu.findById({category: categoryId}).then((menu) =>{
//         res.send(menu);
//     }).catch((err) =>{
//         res.send(err);
//     })
// });

//POST a menu item belonging to a particular category
router.post('/',authenticateUser,authorizeUser,(req,res) =>{
    let body = _.pick(req.body,['category','name','nutrionalFacts','price','description']);
    let menu = new Menu(body);

    menu.save().then((menu) => {
        res.send({
            menu,
            notice: 'Successfully added a new menu item!'
        }).catch((err) =>{
            res.send(err);
        })
    })
});

//UPDATE a menu item 
router.put('/:id',validateId,authenticateUser,authorizeUser,(req,res) =>{
    let id = req.params.id;
    let body = _.pick(req.body,['price','category','name','description']);
    Menu.findByIdAndUpdate({_id: id},{$set: body},{new: true, runValidators: true}).then((menu) =>{
        res.send({
            menu,
            notice: 'Successfully updated the menu item!'
        }).catch((err) =>{
            res.send(err);
        })
    })
});

//DELETE a menu item
router.delete('/:id',validateId,authenticateUser,authorizeUser,(req,res) =>{
    let id = req.params.id;

    Menu.findByIdAndRemove({_id: id}).then((menu) => {
        res.send({
            menu,
            notice: 'Successfully deleted the menu item!'
        }).catch((err) => {
            res.send(err);
        })
    })
});

module.exports = {
    menusController : router
}