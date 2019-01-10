//for validating the id in the url
const {ObjectID} = require('mongodb');

const validateId = function(req,res,next){
    let id = req.params.id;

    if(!ObjectID.isValid(id)){
        res.send('Invalid ID!');
    }else{
        next();
    }
};

module.exports = {
    validateId
}

