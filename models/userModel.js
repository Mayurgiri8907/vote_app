const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const mongoosevb = process.env.MONGOOSE_KEY;
mongoose.connect(mongoosevb);

const user = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    age : {
        type : Number,
        require : true,
    },
    email : {
        type : String,
        require : true,
        quinic : true
    },
    phone : String,
    adharnumber : {
        type : String,
        quinic : true,
        min : 12,
        max : 12,

    },
    password : {
        type : String,
    },
    isvoted : {
        type : Boolean,
        default : false,
    },
    role : {
        type : String,
        enum : ['user','admin'],
        default : 'user'
    },

})

const users = mongoose.model("users",user);

module.exports = users;