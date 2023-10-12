const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./Config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

var contactList = [{
        name: "Arpan",
        phone: "1111111111"
    },
    {
        name: "Tony Stark",
        phone: "1234567890"
    },
    {
        name: "Coding Ninjas",
        phone: "12131321321"
    }
]

app.get('/practice', function(req, res) {
    return res.render('practice', {
        title: "Let us play with ejs"
    });
});


app.get('/', function(req, res) {
    Contact.find({}, function(err, contacts) {
        if (err) {
            console.log('Error in feteching contacts from db');
            return;
        }
        return res.render('home', {
            title: "Contact List",
            contact_list: contacts
        });
    });


})
app.post('/create-contact', function(req, res) {


    Contact.create({
        name: req.body.name,
        phone: req.body.name
    }, function(err, newContact) {
        if (err) {
            console.log('Error in creating a contact!')
            return;
        }
        console.log('******', newContact);
        return res.redirect('back');
    })
});

app.listen(port, function(err) {
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})

// For deleting a contact
app.get('/delete-contact/', function(req, res) {
    // console.log(req.query);
    // get the id from query in the ul
    let id = req.query.id;

    // let contactindex = contactList.findIndex(contact => contact.phone == phone);

    Contact.findByIdAndDelete(id, function(err) {
        if (err) {
            console.log('error in deleting an object from database');
            return;
        }

        return res.redirect('back');
        // if (contactindex != -1) {
        //     contactList.splice(contactindex, 1);
        // }
    });
});