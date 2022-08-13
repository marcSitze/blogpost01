const express = require('express');
const app = express();

// ALL ROUTES
const indexRoutes = require('./routes');

// DATABASE CONNECTION
const ConnectDB = require('./config/db');

const config = require('./config')
const PORT = config.app.port;

// Connect Database
ConnectDB();

app.use('/', indexRoutes);
app.listen(PORT, () => console.log('app listening on port: ', PORT))