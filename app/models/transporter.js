let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const transporterSchema = new Schema({
    name : {type: String, required: true},
    rating: {type: Number, required: true}
});

module.exports = mongoose.model('transporter', transporterSchema);
