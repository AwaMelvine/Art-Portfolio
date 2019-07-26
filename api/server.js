const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(helmet())

app.use('*', (req, res) => {
    res.status(404).json({ error: 'Page Not Found' }); 
});

module.exports = app; 