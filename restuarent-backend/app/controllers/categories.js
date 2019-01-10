const express = require('express');
const router = express.Router();
const _ = require('lodash');

const {Category} = require('../models/category');
const {authenticateUser,authorizeUser} = require('../middlewares/authentication');
const {validateId} = require('../middlewares/utilities');

//POST
router.post('/',authenticateUser,authorizeUser,(req,res) => {
    let user = req.locals.user;
    let body = _.pick(req.body,['category']);

    let category =  new Category(body);
    category.save().then((category) =>{
        console.log(category);
        res.send(category);
    }).catch((err) =>{
        console.log(category);
        res.send(err);
    })
});

//READ all categories
router.get('/',(req,res) =>{
    Category.find().then((categories) =>{
        res.send(categories);
    }).catch((err) =>{
        res.send(err);
    })
});

//READ by one category
router.get('/:id',validateId,(req,res) => {
    let id = req.params.id;
    Category.findById(id).then((category) => {
        res.send(category);
    }).catch((err) => {
        res.send(err);
    })

});

//UPDATE a category
router.put('/:id',validateId,authenticateUser,authorizeUser,(req,res) =>{
    let body = _.pick(req.body,['category']);
    let id = req.params.id;
    

    Category.findOneAndUpdate({_id: id},{$set : body},{new: true, runValidators: true}).then((category) => {
        res.send({
            category,
            notice: 'Successfully updated the category'
        }).catch((err) =>{
            res.send(err);
        })
    })
});

//DELETE a category
router.delete('/:id',validateId,authenticateUser,authorizeUser,(req,res) =>{
    let id = req.params.id;

    Category.findByIdAndDelete({_id: id}).then((category) => {
        res.send({
            category,
            notice: 'Successfully deleted the category'
        })
    })
})

module.exports = {
    categoriesController : router
}