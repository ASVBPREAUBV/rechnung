const express = require('express');
const pug = require('pug');

const tools = require('./tools');
const config = require('./config/config');

const app = express();
app.set('views', './src/views');
app.set('view engine', 'pug');

const PORT = process.env.PORT;
const HOST = '0.0.0.0';
const OUTPUT_FOLDER = './public';
const OUTPUT_FILENAME = `filename_${Math.floor(Math.random() * 100000)}`;

if (!PORT) throw new Error('process.env.PORT not defined');

app.get('/', (req, res) => {
    res.render('index', {config: config})
});

app.use('/static', express.static('./src/static'));

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

tools.create_pdf(OUTPUT_FOLDER, OUTPUT_FILENAME);