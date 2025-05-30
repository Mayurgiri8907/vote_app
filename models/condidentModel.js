const mongoose = require('mongoose');

const condidentSchema = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    partyname : {
        type : String,
    },
    age : {
        type : Number,
        min : 18,
        max : 100,
    },
    votes :[ {
        type : mongoose.Schema.Types.ObjectId,
        ref : "userModel"
    }],
    votecount : {
        type : Number,
        default: 0
    }

})

const condidents = mongoose.model("condidents",condidentSchema);

module.exports = condidents;