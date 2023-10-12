//require the library
const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb+srv://rahulverma9559:pWfzCo7RU2pSSCir@cluster0.7sa8r47.mongodb.net/?retryWrites=true&w=majority');

// mongoose.connect('mongodb://127.0.0.1/Mongodb-Database');

//acquire the connection(to check if it's successful)
const db = mongoose.connection;

//error
db.on('error', function(err) { console.log(err.message); });

//up and running then print the message
db.once('open', function() {

    console.log("Successfully connected to the database");

});