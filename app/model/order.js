/**
 * Created by sdonose on 5/30/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    quantity_requested:{type:Number,default:0},
    total: {type: Number, default: 0},
    created: {type: Date},
    modified: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Order', OrderSchema);