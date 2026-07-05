const { Client } = require("pg");

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect()
  .then(() => {
    console.log("PostgreSQL Connected");
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = client;