/**
 * Created by sdonose on 5/30/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: mongoose.Schema.Types.Number
        }
    }],
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    total: {type: Number, default: 0},
    confirmed: {type: Boolean, default: false},
    created: {type: Date},
    modified: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Order', OrderSchema);