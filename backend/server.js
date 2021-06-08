const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

// routes
var testAPIRouter = require("./routes/testAPI");
var UserRouter = require("./routes/Users");
const session = require("express-session");
const passport = require("passport");

require('passport-strategy')(passport);
require('dotenv').config();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        cookie: {
        	// Age of 1 day
            maxAge: 24*60*60,
            httpOnly: false,
            secure: false,
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
    // res.locals.success_msg = req.flash('success_msg');
    // res.locals.error_msg = req.flash('error_msg');
    // res.locals.error = req.flash('error');
    next();
});

// setup API endpoints
app.use("/testAPI", testAPIRouter);
app.use("/user", UserRouter);


// Connection to MongoDB
const db = require('./config/atlasKeys').mongoURI;

mongoose.connect(db, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

app.listen(PORT, () => {
    console.log('express server started on port ' + PORT);
});
