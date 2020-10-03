const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/connect_face');
const db = mongoose.connection; 

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log("Succesfully Connected to the database")
});
module.exports = db;