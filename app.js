require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbUrl = process.env.DATABASE_URL;
const port = process.env.PORT || 8080;

const app = express();


// DATABASE
MongoClient.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
   
    // CHECK FOR CONNECTION TO DATABASE ERRORS, VERIFY DATABASE CONNECTION
    if (err) throw err;
    console.log(`Database connected successfully!`);


    // GLOBAL DATABASE VARIABLES
    const db = client.db('tododb');
    const dbCollection = db.collection('list');


    // MIDDLEWARES
    app.set('view engine', 'ejs');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true} ));
    app.use(express.static('public'));


    //READ ROUTE
    app.get('/', (req, res) => {
        dbCollection.find().toArray()
        .then(results => {
            res.render('index.ejs', { list: results })
        })
        .catch(error => console.error(error))
    });


    //CREATE ONE ROUTE
    app.post('/list', (req, res) => {
        dbCollection.insertOne(req.body)
        .then(results => {
            console.log('1 item added to database')
            res.redirect('/')
        })
        .catch(error => console.error(error))
    });


    //UPDATE ONE ROUTE
    app.put('/list/:id', (req, res) => {
        const o_id = ObjectID(req.params.id)

        dbCollection.findOneAndUpdate(
            { _id: o_id }, 
            {
                $set: {
                    item: req.body.item
                }
            },
            {
                upsert: true
            } 
        )
        .then(results => {
            console.log('1 document updated..')
            res.redirect('/')
        })
        .catch(error => console.error(error))
    });


    // DELETE ONE ROUTE
    app.delete('/list/:id', (req, res) => {

        const o_id = ObjectID(req.params.id)

        dbCollection.findOneAndDelete({ _id: o_id } )
        .then(results => {
            console.log('1 document deleted..')
        })
        .catch(error => console.error(error))
    });


    // DELETE ALL ROUTE
    app.delete('/list', (req, res) => {

        dbCollection.deleteMany({})
        .then(result => {
            console.log('Deleted all documents successfully!')
        })
        .catch(error => console.error(error))
    });  
});


// SERVER
app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
});








