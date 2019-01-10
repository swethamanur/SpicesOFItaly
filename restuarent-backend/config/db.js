const mongoose  = require('mongoose');

//setting up the global promise(javascript promise ) to mongoose promise
mongoose.promise = global.promise;

//setting up the connection between the backend folder and the mongod db thru the .connect method
mongoose.connect('mongodb://localhost:27017/spices-of-italy',{useNewUrlParser : true}).then(() => {
    console.log('connected to the db');
}).catch((err) => {
    console.log(err);
});



module.exports = {
    mongoose
}