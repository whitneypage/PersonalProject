var mongoose = require('mongoose');

var tipSchema = new mongoose.Schema ({
	tipDate: { type: Date },
	tipAmount: { type: Number }

});

module.exports = mongoose.model('Tips', tipSchema);