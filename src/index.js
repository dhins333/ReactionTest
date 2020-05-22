const path = require('path');
const express = require('express');
const hbs = require('hbs');
const homeRouter = require('./routes/homeRouter');

const app = express();

app.use(express.static(path.join(__dirname,'../','public')));
app.set('view engine','hbs');
app.set('views',path.join(__dirname,'../','templates','views'));
hbs.registerPartials(path.join(__dirname,'../','templates','partials'));
app.use(homeRouter);



app.listen(process.env.PORT);