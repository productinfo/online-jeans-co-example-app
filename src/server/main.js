
const Store = require('./store');

const commands = require('commands');
const express = require('express');

const serveStatic = require('serve-static');
const morgan = require('morgan');

const app = express();
const store = new Store(`${__dirname}/../data/main.json`);

app.use(morgan('dev'));
app.use(serveStatic(`${__dirname}/../client`, {index: 'index.html'}));

app.get('/api/manufacturers', (req, res) => {

   let summary = store.summarise('manufacturer', ['gender', 'deliveryCountry']);
   res.send(summary);


});

app.get('/api/sizes', (req, res) => {

   let summary = store.summarise('size', ['deliveryCountry']);
   res.send(summary);

});

app.get('/api/months', (req, res) => {

   let summary = store.summarise('month', ['deliveryCountry']);
   res.send(summary);

});

app.listen(commands.get('port', 3456));
