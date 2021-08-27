const express = require('express');
const mongoose = require('mongoose');
// common = require('@leadercodes/modelsnpm');
// common.init(mongoose);

var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

const request = require('request')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cookieParser())
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.all("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");


    if (req.method === "OPTIONS") {
        res.status(200).end();
    } else {
        next();
    }
});


const uri = process.env.DB_CONNECT;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const viewsRouter = require('./routes/views')
const apiRouter = require('./routes/api')
const { checkPermission, isPermission } = require('./routes/auth')

app.use(express.static(path.join(__dirname, './build')));

// app.use('/:userName/isPermission', checkPermission, (req, res) => {
//     res.status(200).send()
// });

// app.get("/", (req, res, next) => {
//     console.log("redirect");
//     res.redirect("https://accounts.codes/quiz/login");
// })
app.use('/:userName/isPermission', checkPermission, isPermission)

app.use('/api', apiRouter)
app.use('/*', viewsRouter)

// app.use('/*', viewsRouter)


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})



