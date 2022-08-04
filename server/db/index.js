require('dotenv').config()
const { Client } = require('pg');


const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PW,
  port: process.env.DB_PORT
})


client.connect(function(err) {
  if(err) throw err;
  console.log('database connected')
});

module.exports = client;