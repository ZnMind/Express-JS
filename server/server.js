const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

let app = express();
let arrLog = [];

app.use('/', (req, res, next) => {
    console.log(req.originalUrl);
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/contact-form', (req, res, next) => {
    let person = {
        name: req.body.name,
        email: req.body.email
    }
    arrLog.push(person);
    fs.writeFileSync('server/log.json', JSON.stringify(arrLog))
    res.send(arrLog);
})

app.use(express.static(path.join(__dirname, '../public')));

app.listen(3000);