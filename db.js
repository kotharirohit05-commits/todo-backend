const { Client } = require("pg");


const client = new Client({

    host: "localhost",

    user: process.env.DB_USER,

    database: process.env.DB_NAME,

    password: process.env.DB_PASSWORD,

    port: 5432

});


client.connect()

.then(() => {

    console.log("PostgreSQL Connected");

})

.catch((error) => {

    console.log(error);

});


module.exports = client;