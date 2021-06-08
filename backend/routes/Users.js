var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt")
const passport = require('passport')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')

// Load User model
const User = require("../models/Users");

require('../passport-strategy')(passport);

isItAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/register");
}
// GET request
// Getting all the users
router.get("/", function(req, res) {
    User.find(function(err, users, req) {
		if (err) {
			// console.log(err);
		} else {
			res.json(users);
		}
	})
});

// POST request
// Add a user to db
router.post("/register", async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    //Checking if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(204).send('Email already exists!');
    
    await newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// POST request 
// Login
router.post("/login", (req, res, next) => {
    // console.log(req.body);
    passport.authenticate('local', function(err, user) {
        if (err) { return next(err); }
        if (!user) { return res.status(204).redirect('/login'); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            res.status(200).json(user);
        });
    })(req, res, next);
});

router.get("/logout", (req, res) => {
    req.logout();
    var success = true;
    res.status(200).json(success);
    console.log("logged out successfully");
});

// Check if user is authenticated
router.get("/legit", (req, res) => {
    var success = false;
    if(req.isAuthenticated())
        success = true;
    res.status(200).json(success);
})


//DELETE SPECIFIC USER
router.delete('/:userId', async (req,res) => {
    try {
        const removeduser = await User.remove({_id : req.params.userId});
        res.json(removeduser);
    } catch (err) {
        res.json({message : err});
    }
});

//REMOVE ALL USERS AT ONCE <--DANGER-->
router.delete('/', async (req,res) => {
    try {
        const removeduser = await User.remove();
        res.json(removeduser);
    } catch (err) {
        res.json({message : err});
    }
});


module.exports = router;

