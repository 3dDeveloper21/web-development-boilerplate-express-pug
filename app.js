
// Working routes:
const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const PrismicH = require('@prismicio/helpers');
// const fetch = require('node-fetch');
require('dotenv').config();

const fetch = require('node-fetch');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('pages/home')
});

app.get('/about', (req, res) => {
  res.render('pages/about')
})

app.get('/collections', (req, res) => {
  res.render('pages/collections')
})

app.listen(3000);