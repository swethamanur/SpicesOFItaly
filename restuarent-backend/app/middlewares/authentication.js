const {User} = require('../models/user');

const authenticateUser = function(req,res,next){
    let token = req.header('x-auth');
    //console.log(token);
    
    User.findByToken(token).then((user) => {
        //console.log(user);
        req.locals = {
            user,
            token
        };
        next();
    }).catch(() => {
        res.status(401).send('You need to be logged in');
    })


};


const authorizeUser = function(req,res,next){
    let user = req.locals.user;

    if(user.role == "Admin"){
        next();
    }else{
        res.status(403).send('You are unauthorized to access this page!');
    }
}

module.exports = {
    authenticateUser,
    authorizeUser
}