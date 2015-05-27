var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cors = require('cors');
var bcrypt = require('bcrypt');



var app = express();
var port = 9000;
var mongoUri = 'mongodb://localhost:27017/PP'


app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret: '1343343334'
}))


var UserCtrl = require('./api/Controllers/user-controller');
var AuthCtrl = require('./api/Controllers/auth-controller');

var User = require('./api/Schemas/userSchema.js');
var Location = require('./api/Schemas/locationSchema.js');




mongoose.connect(mongoUri, function(err) {
    if (err) {
        console.log(err)
        return;
    }
    console.log('Connnected');
    app.listen(port, function() {
        console.log('Now listening at port: ' + port);
    });
})



passport.use(new LocalStrategy(
    function(username, password, done) {

        console.log("inLocal", username);

        Location.findOne({
            storeEmail: username
        }, function(err, location) {
            if (err) {
                return done(err);
            }
            if (location) {
                if (!location.comparePassword(password)) {
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }
                console.log("location found", location);
                return done(null, location);
            } else {
                User.findOne({
                    email: username
                }, function(err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        return done(null, false, {
                            message: 'Incorrect username.'
                        });
                    }
                    if (!user.comparePassword(password)) {
                        return done(null, false, {
                            message: 'Incorrect password.'
                        });
                    }
                    console.log("user found", user);
                    return done(null, user);
                });
            }
        })
    }
));



app.use(passport.initialize());
app.use(passport.session());




var isAuthed = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(403).end();
    }
    return next();
}


passport.serializeUser(function(user, done) {
    done(null, user);
})
passport.deserializeUser(function(obj, done) {
    done(null, obj);
})

app.use(express.static(__dirname + '/public'));



//Login User

app.post('/api/auth', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        return res.json(user);
    })(req, res, next);
});

//Creates new User
app.post('/api/register', function(req, res) {
    var newUser = new User(req.body);
    newUser.save(function(err, user) {
        if (err) {
            return res.status(500).end();
        }

        return res.json(user);
    })
})

// add Tip Data to the User
app.post('/api/tips/:userId', function(req, res) {
    console.log("req.user", req.body);
    User.findByIdAndUpdate(
        req.params.userId, {
            $push: {
                tips: req.body
            }
        }, {
            safe: true
        },
        function(err, model) {
            if (!err) res.status(200).json(model);
            console.log(err);
        }
    )

});
// getting Tip Data 
app.get('/api/tips/:userId', function(req, res) {
    User
        .findOne({
            _id: req.params.userId
        })
        .exec().then(function(data) {
            return res.json(data);
        })
});



// Create Store

app.post('/api/register/location', function(req, res) {
    var newStore = new Location(req.body);
    newStore.save(function(err, user) {
        console.log("Post", user);
        if (err) {
            return res.status(500).send(err);
        }
        return res.json(user);
    })
})

// Login Location
app.post('/api/auth/location', function(req, res, next) {
    console.log('server req made it', req.body);
    passport.authenticate('local', function(err, user, info) {
        return res.json(user);
    })(req, res, next);
});


 // Get Server List from LocationID 
app.get('/api/location/:locationId', function(req, res) {
    User
        .find({
            locationId: req.params.locationId
        }, 'firstName lastName email', function(error, data) {
            return res.json(data);
        })

})

// Add Sales Data to the Location
app.post('/api/location/:locationId', function(req, res) {
        Location.findByIdAndUpdate(
            req.params.locationId, {
                $push: {
                    sales: req.body
                }
            }, {
                safe: true
            },
            function(err, model) {
                if (!err) res.status(200).json(model);
                console.log(err);
            }
        )
})
    // Get all the Locations
app.get('/api/locations', function(req, res) {
	console.log("hit api location")
    Location.find({}, function(error, data) {
        return res.json(data);
    })
});

// Add Sales Data to the user
app.post('/api/sales/:userId', function(req, res) {
        User.findByIdAndUpdate(
            req.params.userId, {
                $push: {
                    sales: req.body
                }
            }, {
                safe: true
            },
            function(err, model) {
                if (!err) res.status(200).json(model);
            }
        )
})

//Getting all user info from a certain location 

app.get('/api/users/:locationId', function(req, res) {
    User.find({locationId: req.params.locationId}, function(error, data) {
        return res.json(data);
    })
});

//removing a location
app.delete('/api/remove/:locationId', function(req, res){
	Location.remove({_id: req.params.locationId}, function(err, data) {
		  if (err) return res.status(500).send(err);
            res.send(data);
        });
})

// getting a specific user by week info

app.get('/api/dash/:userId', function(req, res) {
	
    User
    .find({_id: req.params.userId}, 'sales', function(err, data) {
    	if (err) return res.status(500).send(err);
    	res.json(data);
    })

})











