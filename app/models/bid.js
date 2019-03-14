let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const bidSchema = new Schema({
    price : {type: Number, required: true},
    vehicle : {type:String, required: true},
    status : {type:String, enum:['win', 'lose', 'default']},
    transporter: {type: Schema.Types.ObjectId, ref: 'transporter'},
    job: {type: Schema.Types.ObjectId, ref: 'bid'}
});

module.exports = mongoose.model('bid', bidSchema);
