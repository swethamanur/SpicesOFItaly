const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {seatSchema,Seat} = require('./seat');

const restaurentSchema = new Schema ({
    name: {
        type: String,
        default: 'Spices of Italy',
        required: true
    },
    address: {
        type: String,
        required: true,
        maxlength: 100,
        required: true,
        unique: true
    },
    contactNumber : {
        type: String,
        required: true,
        maxlength: 10
    },
    seats : [seatSchema], //collection: [child schema]
    timings: {
        type: String,
        require: true
    },
    //write a pre hook for this
    waitTime : {
        type: Number,
        default: 0 
        
    },
    facilities:{
        'Order Online' : String,
        'Free Wifi': String
    }
    //TODO - Geolocation
});

//an instance method for saving a restaurent, create the seats
restaurentSchema.methods.generateSeats =function(){
    let restaurent = this;
    console.log('2. entered generateSeats function');
    //generating an array of seats to the restuarent before it gets generated
    for (let i =1; i< 11; i++){
        let seat = new Seat({seatNumber:i});
        restaurent.seats.push(seat);    
    };

    console.log('3.after generating seats');
        return restaurent.save().then((restaurentSeats) =>{
            console.log(restaurentSeats,'4.after generating the seats')
            return restuarentSeats
        });
        
}
   
       



const Restaurent = mongoose.model('Restaurent',restaurentSchema);

module.exports = {
    Restaurent
}