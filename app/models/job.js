let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const offerSchema = new Schema({
    origin : {type: String, required: true},
    destination : {type: String, required: true},
    budget: {type: Number, required:true},
    ship_date: {type: Date, required:true},
    distance: {type:Number, required:true},
    status: {type:String, enum:['complete', 'cancel', 'bidded', 'on delivery', 'waiting'], required:true},
    shipper: {type: Schema.Types.ObjectId, ref: 'shipper'}
});

module.exports = mongoose.model('offer', offerSchema);
