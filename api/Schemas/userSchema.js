var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var q = require('q');


var userSchema = new mongoose.Schema ({
	firstName: { type: String, required: true},
    lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true, lowercase: true },
	password: { type: String, required: true },
    locationId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },
    tips: [ 
        {
            tipDate: Date,
            tipAmount: Number 
        }
    ], 
    sales: [
        {
            date: Date,
            amount: Number
        }
    ]


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

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}






module.exports = mongoose.model('User', userSchema);