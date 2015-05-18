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
app.use(session ({
	secret: '1343343334'
}))

var UserCtrl = require('./api/Controllers/user-controller');
var AuthCtrl = require('./api/Controllers/auth-controller');

var User = require('./api/Schemas/userSchema.js');


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
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));


app.use(passport.initialize());
app.use(passport.session());

// var isAuthed = function(req, res, next) {
// 	if(!req.isAuthenticated()) {
// 		return res.status(403).end();
// 	}
// 	return next();
// }

passport.serializeUser(function(user, done) {
	done(null, user);
})
passport.deserializeUser(function(obj, done) {
	done(null, obj);
})

app.use(express.static(__dirname+'/public'));

app.post('/api/auth', function(req, res, next) {
	console.log('server req made it', req.user);
	passport.authenticate('local', function(err, user, info) {
	return res.status(200).end();
	}) (req, res, next);
});

app.post('/api/register', function(req, res) {
	var newUser = new User(req.body);
	newUser.save(function(err, user) {
		if (err) {
			return res.status(500).end();
		}
		return res.json(user);
	})
})


app.post('/api/tips', function(req, res) {
	User.findById
});

// app.get('/user', UserCtrl.read);

// app.put('/user', UserCtrl.update);

// app.delete('/user', UserCtrl.delete);





