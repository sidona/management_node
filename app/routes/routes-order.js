/**
 * Created by sdonose on 5/30/2016.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Order=mongoose.model('Order');
var Product=mongoose.model('Product');


router.post('/order',function (req, res) {

    var ceva = function(product) {
        return req.body.products.find(function(p){
            return p._id == product._id;
        });
    };
    Product.find({
        _id: { $in: req.body.products.map(function (p) {return new mongoose.Types.ObjectId(p._id);}) }
    })
        .exec()
        .then(function (products) {
            var total=0;
            var order=new Order();
            order.customer=req.body.customerId;
            products.forEach(function (product) {
                total += product.price;
                var quantity = ceva(product).quantity;
                order.products.push({
                    product: product._id,
                    quantity: quantity
                });
            });
            order.total = total;
            order.created = Date.now();
            order.modified = Date.now();
            order.save(function(error) {
                if (error)
                    res.send(error);
                res.json({ message: 'Order created!', order: order });
            });
        }, function(error){
            res.send(error);
        });
});

router.get('/order',function (req,res) {
    Order.find(function (err,order) {
        if(err)
            res.send(err);
        res.json(order);
    })
});
router.get('/order/:id',function (req,res) {
    return Order.findById(new mongoose.Types.ObjectId(req.params.id))
        .populate('products.product')
        .populate('customer')
        .exec(function (err,order) {
        if(err)
            res.send(err);

        res.json(order);
    })
});
router.get('/order/:id/confirm',function (req,res) {
    Order
        .findById(new mongoose.Types.ObjectId(req.params.id))
        .populate('products.product')
        .exec()
        .then(
            function (order) {
                if(order.confirmed) {
                    res.json("Order already confirmed.", 422);
                }else{
                    order.confirmed = true;
                    order.save().then(function(){
                        var promises = [];
                        order.products.forEach(function(op){
                            op.product.stock -= op.quantity;
                            promises.push(op.product.save());
                        });
                        Promise.all(promises).then(
                            function(){
                                res.json("done");
                            },
                            function(error){
                                res.json(error);
                            }
                        );
                    });
                }
            },
            function(error){
                res.json(error);
            }
        );
});
router.get('/order/:id/unconfirmed',function (req,res) {
    Order
        .findById(new mongoose.Types.ObjectId(req.params.id))
        .populate('products.product')
        .exec()
        .then(
            function (order) {
                if(order.confirmed) {
                    res.json("Order already unconfirmed.", 422);
                }else{
                    order.confirmed = true;
                    order.save().then(function(){
                        var promises = [];
                        order.products.forEach(function(op){
                            op.product.stock += op.quantity;
                            promises.push(op.product.save());
                        });
                        Promise.all(promises).then(
                            function(){
                                res.json("done");
                            },
                            function(error){
                                res.json(error);
                            }
                        );
                    });
                }
            },
            function(error){
                res.json(error);
            }
        );
});

module.exports = router;