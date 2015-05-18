var User = require('../Schemas/userSchema.js');

module.exports = {
    // create: function(req, res) {
    //     console.log("req.body", req.body);
    //     var newUser = new User({
    //         firstName: req.body.firstName,
    //         lastName: req.body.lastName,
    //         email: req.body.email,
    //         password: req.body.password
    //     });
    //     newUser.save(function(err, result) {
    //         if (err) return res.status(500).send(err);
    //     });
    // },
    
    // create: function(req, res) {
    //     console.log(req.body)
    // var newUser = new User(req.body);
    //     newUser.save(function(err, user) {
    //         if (err) {
    //             return res.status(500).end();
    //         }
    //         return res.json(user);
    //     });
    // },

    read: function(req, res) {
        console.log('req.query: ', req.query);
        User.find(req.query)
            .exec(function(err, result) {
                if (err) return res.status(500).send(err);
                res.send(result);
            });
    },

    update: function(req, res) {
        User.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
            if (err) return res.status(500).send(err);
            res.send(result);
        });
    },

    delete: function(req, res) {
        User.findByIdAndRemove(req.params.id, function(err, result) {
            if (err) return res.status(500).send(err);
            res.send(result);
        });
    }


};
