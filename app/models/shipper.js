let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const shipperSchema = new Schema({
    name : {type: String, required: true}
});

module.exports = mongoose.model('shipper', shipperSchema);
