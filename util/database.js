const Sequelize = require('sequelize');

const database = new Sequelize('node-complete', 'jakcllns', 'jake1989',{dialect: 'postgres', host:'localhost'});

module.exports = database;



