const mongoose = require('mongoose');
const Score = mongoose.model('Score',{
    name:{
        type:String,
        required:true
    },
    average:{
        type:Number,
        required:true
    },
    fastest:{
        type:Number,
        required:true
    },
    slowest:{
        type:Number,
        required:true
    }
})
module.exports = Score;