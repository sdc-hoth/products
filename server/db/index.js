const { Client } = require('pg');


const client = new Client({
  user: 'feifeiliang',
  host: '3.88.234.248',
  database: 'sdc',
  password: 'feifeiliang',
  port: 5432,
})


client.connect(function(err) {
  if(err) throw err;
  console.log('database connected')
});

module.exports = client;