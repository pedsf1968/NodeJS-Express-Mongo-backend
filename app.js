const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Thing = require('./models/Thing.js');

mongoose.connect('mongodb+srv://MongoDBUser:XTFu8ZyEOnwt39MF@mongodbcluster.ebujh.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.post('/api/stuff', (req, res) => {
    delete req.body._id;

    // récupère l'objet passé dans le body de la requète
    const thing = new Thing({
        ...req.body
    });

    // utilise la méthode de l'objet pour le sauver
    thing.save()
        .then(() => res.status(201).json({message: 'Objet enregistré !'}))
        .catch(error  => res.status(400).json({error }));
});

app.get('/api/stuff/:id', (req, res) => {
    // recherche l'élément par son id passé en paramètre
    Thing.findOne({_id: req.params.id})
       .then(thing => res.status(200).json(thing))
       .catch(error => res.status(404).json({ error}));
});

app.get('/api/stuff', (req, res) => {
    // recherche les éléments
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error}));
});


module.exports = app;