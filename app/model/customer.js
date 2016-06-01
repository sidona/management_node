/**
 * Created by sdonose on 5/30/2016.
 */

var mongoose     = require('mongoose');
//var Schema       = mongoose.Schema;

var CustomerSchema=new mongoose.Schema({

    name: { type: String},
    address:{type: String},
    telephone:{type: Number},
    email:{type: String},
    order: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }]

});

mongoose.model('Customer', CustomerSchema);