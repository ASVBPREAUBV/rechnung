const express = require('express');
const pug = require('pug');
const moment = require('moment');

const tools = require('./tools');
const config = require('./config/config');
const invoice = require('./config/invoices/customer');

const app = express();
app.set('views', './src/views');
app.set('view engine', 'pug');

const PORT = process.env.PORT;
const HOST = '0.0.0.0';
const OUTPUT_FOLDER = './public';
const OUTPUT_FILENAME = `filename_${invoice.customer.project}_${invoice.invoice.no}`;
const date = moment().format("DD.MM.YYYY");

if (!PORT) throw new Error('process.env.PORT not defined');


app.get('/', (req, res) => {
    res.render('index', {config: config, invoice: invoice, date: date})
});

app.use('/static', express.static('./src/static'));

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

tools.create_pdf(OUTPUT_FOLDER, OUTPUT_FILENAME);