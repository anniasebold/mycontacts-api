const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'mycontacts',
});

client.connect();

/* Passando o query e os valores
  a serem adicionados de forma separada
  evitando o SQL Injection */
exports.query = async (query, values) => {
  const { rows } = await client.query(query, values);
  return rows;
};
