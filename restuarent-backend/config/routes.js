const express = require('express');
const router = express.Router();

const {restaurentsController} = require('../app/controllers/restaurents');
const {categoriesController} = require('../app/controllers/categories');
const {menusController} = require('../app/controllers/menus');
const {giftCardsController} = require('../app/controllers/giftCards');
const {usersController} = require('../app/controllers/users');

router.use('/restaurents',restaurentsController);
router.use('/categories',categoriesController);
router.use('/menus',menusController);
router.use('/giftCards',giftCardsController);
router.use('/users',usersController);



module.exports = {
    routes : router
}