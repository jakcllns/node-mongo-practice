
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb://localhost:8080/?readPreference=primary&appname=MongoDB%20Compass&ssl=false', {useUnifiedTopology: true})
    .then(client => {
        console.log(`Connected to ${client.db('shop').databaseName} database...`)
        _db = client.db('shop')
        callback();
    })
    .catch(err => {
        console.log(err)
        throw err;
    })};

const getDb = () => {
    if(_db){
        return _db;
    }
    throw 'No database found!'
}

module.exports = {mongoConnect, getDb};
