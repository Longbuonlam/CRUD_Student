// Filename - Server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const api = require('./api');

const port = process.env.PORT
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/view');

app.use(methodOverride('_method'));

app.use(express.static('public'));

app.listen(port, function () {
    console.log("Server is listening at port:" + port);
});

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Parses the text as json
app.use(bodyParser.json());

app.use('/', api);

