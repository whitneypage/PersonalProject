var User = require('../Schemas/userSchema.js');

module.exports = {

    post: function(req, res) {
        User.find(req.query, function(err, response) {
            response.comparePW(req.body.password, function(results) {
                res.send(results);
            })
        })
    }


}; // ends exports
