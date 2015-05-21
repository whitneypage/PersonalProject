var mongoose = require('mongoose');
var bcrypt = require('bcrypt');


var locationSchema = new mongoose.Schema ({
	 storeName: { type: String, required: true, lowercase: true },
	 storeNumber: { type: Number },
	 ownerName: { type: String, required: true, lowercase: true },
	 storeEmail: { type: String, required: true, unique: true, lowercase: true },
	 password: { type: String, required: true },
	 sales: [
	 	{
	 		date: Date,
	 		amount: Number
	 	}
	 ]

}); // ends Schema


locationSchema.pre('save', function(next) {
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

locationSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}



module.exports = mongoose.model('Location', locationSchema);