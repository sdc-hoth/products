require('dotenv').config()
const express = require('express');

const app = express();


const router = require('./routes.js');


//set up routes

app.use('/products', router)

PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log(`Listening at http://localhost:${PORT}`);