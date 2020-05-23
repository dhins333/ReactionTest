const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const Score = require('../models/Score');
mongoose.connect(process.env.DEV_URL,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true});

router.get('/',(req,res) => {
    res.render('home');
})

router.post('/saveScore',async (req,res) => {
    try{
        const score = new Score({
            name:req.body.name,
            average:req.body.average,
            fastest:req.body.fastest,
            slowest:req.body.slowest
        });
        await score.save();
        res.send();
    }catch(e){
        res.status(400).send();
    }
})

module.exports = router;