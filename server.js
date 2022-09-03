const express = require('express');
const path = require('path')
const app = express();
const cookieParser = require('cookie-parser')

// ALL ROUTES
const indexRoutes = require('./routes');

// DATABASE CONNECTION
const ConnectDB = require('./config/db');


const config = require('./config')
const PORT = config.app.port;

// Connect Database
ConnectDB();

app.use(cookieParser())

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

// set static folder
app.use(express.static(path.join(__dirname, '/public')))

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

app.use('/', indexRoutes);
app.listen(PORT, () => console.log('app listening on port: ', PORT))