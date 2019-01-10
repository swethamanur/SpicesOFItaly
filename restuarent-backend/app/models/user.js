const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {Order,orderSchema} = require('./order');

const userSchema = new Schema({
    username: {
        type: String,
        required:true,
        minlength: 3,
        maxlength: 50
    },

    password:{
        type: String,
        required: true
    },
    
    email: {
        type: String,
        validate : {
            validator: function(email){
                return validator.isEmail(email)
            },
            message: function(){
                return 'Invalid Email format!'
            }
        },
        required: true,
        unique: true
    },

    address: {
        type: String,
        minlength: 10,
        maxlength: 1000
    },

    contactNumber: {
        type: String,
        validate: {
            validator: function(contactNumber){
                return validator.isMobilePhone(contactNumber);
            },
            message: function(){
                return 'Invalid phone number!'
            }
        },
        required: true,
        unique: true
    },

    role: {
        type: String,
        enum: ['Customer','Admin'],
        default: 'Customer',
        required: true
    },

    tokens: [
        {
            token:{
                type: String
            }
        }
    ],

    //array of orders
    //children: [childSchema]
    orders : [orderSchema]
});

//pre-hook for creating a hashed password and saving the user details
//pre-save
userSchema.pre('save',function(next) {
    let user = this;
    bcrypt.genSalt(10).then((salt) => {
        bcrypt.hash(user.password,salt).then((hashedPassword) => {
            user.password = hashedPassword;
            next();
        }).catch((err) => {
            console.log(err);
        })
    }).catch((err) => {
        console.log(err);
    })
    
});

//user shortInfo instance methods
userSchema.methods.shortInfo = function(){
    //let user = this;
    return {
        _id: this.id,
        username: this.username,
        email: this.email,
        address: this.address,
        contactNumber: this.contactNumber,
        orders: this.orders
    }
}



//token based authorization- instance methods
userSchema.methods.generateToken = function(){
    let user = this;
    let tokenData = {
        id: user._id
    };

    let token  = jwt.sign(tokenData, 'supersecret');
    //pushing the token object which has two propeties namely the _id and the token!
    user.tokens.push({token});

    return user.save().then((token) => {
        return token
    });
}

//finding the token from the array of user's tokens and compare with the incoming request header token value:
//we use statics method here, since we are going to seach on the entire array of tokens of a user, so on the entire schema we use, statics method:
//since tokens is an object defined on the entire schema 😊
//we need to find the token of all the users' tokens and hence it is a statics method.

userSchema.statics.findByToken = function(token){
    let User = this;
    
    let tokenData;
    try {
        tokenData = jwt.verify(token,'supersecret');
        
    } catch (e) {
        return Promise.reject(e);
    }

   return User.findOne({
       '_id': tokenData.id,
       'tokens.token' : token
   }).then((user) => {
        if(user){
            return Promise.resolve(user)
        }else{
            return Promise.reject(user)
        }
    })

};




const User = mongoose.model('User',userSchema);

module.exports = {
    User
}