// external dependencies
const express = require('express');
const pug = require('pug');
const moment = require('moment');

// internal dependenies
const tools = require('./tools');
const config = require('./config/companyAddress');
const invoice = require('./config/invoices/customer');

// express setup
const app = express();
app.set('views', './src/views');
app.set('view engine', 'pug');

// local constants
const PORT = process.env.PORT ? process.env.PORT : '3000';
const HOST = '0.0.0.0';
const OUTPUT_FOLDER = process.env.OUTPUT ? process.env.OUTPUT : './public';
const OUTPUT_FILENAME = `${invoice.customer.project}_${invoice.invoice.no}`;
const date = moment().format("DD.MM.YYYY");

// create PDF
tools.create_pdf(HOST, PORT, OUTPUT_FOLDER, OUTPUT_FILENAME);

// serve invoice
app.get('/', (req, res) => {
    res.render('index', {config: config, invoice: invoice, date: date})
});

// serve static (images, css)
app.use('/static', express.static('./src/static'));

// start local server
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

