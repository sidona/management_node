/**
 * Created by sdonose on 5/30/2016.
 */

var mongoose     = require('mongoose');
//var Schema       = mongoose.Schema;

var ProductSchema = new mongoose.Schema({
    name: { type: String},
    quantity:{ type: Number},
    price:{ type: Number},
    stock : { type: Number},
    created : { type: Date},
    modified : { type: Date, default: Date.now }
});

mongoose.model('Product', ProductSchema);