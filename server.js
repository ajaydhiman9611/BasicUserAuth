var express = require('express'),
    app = express(),
    port = process.env.PORT || 8000,
    User = require('./models/users.model'),
    bodyParser = require('body-parser'),
    jsonwebtoken = require("jsonwebtoken");

var routes = require('./routes/user.route');
const mongoose = require('mongoose');
const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
};

const mongoURI = process.env.MONGODB_URI;
mongoose.connect('mongodb+srv://root:yvoN7d7tRuCaPOED@cluster0.brwjw.mongodb.net/UserAuth?retryWrites=true&w=majority', option)
    .then(data => {
        console.log("MongoDB connected successfully!")
    })
    .catch(err => {
        console.log("Connection error!", err)
    })

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function (err, decode) {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

app.use("/", routes);

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});

app.listen(port);

console.log('RESTful API server started on: ' + port);

module.exports = app;