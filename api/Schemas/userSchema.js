var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var q = require('q');


var userSchema = new mongoose.Schema ({
	firstName: { type: String, required: true, lowercase: true },
    lastName: { type: String, required: true, lowercase: true },
	email: { type: String, required: true, unique: true, lowercase: true },
	password: { type: String, required: true }
    // tips: { type: mongoose.Schema.Types.ObjectId, ref: "Tips"}

});


userSchema.pre('save', function(next) {
    var user = this;
    this.timestamp = new Date();

    bcrypt.genSalt(function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            else {
                user.password = hash;
                next();
            }
        })
    })
})

userSchema.methods.comparePassword = function(pass) {
    var deferred = q.defer();
    bcrypt.compare(pass, this.password, function(err, isMatch) {
        if (err) {
            deferred.reject(err);
        }
        else {
            deferred.resolve(isMatch);
        }
    });
    return deferred.promise;
}


module.exports = mongoose.model('User', userSchema);