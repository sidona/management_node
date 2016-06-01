/**
 * Created by sdonose on 5/30/2016.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Order=mongoose.model('Order');
var Product=mongoose.model('Product');


router.post('/order',function (req,res) {

    Product.find({
        _id:{$in:req.body.products.map(function (oid) {return new mongoose.Types.ObjectId(oid);}) }
    })
        .exec()
        .then(function (products) {
            var total=0;
            var order=new Order();
            products.forEach(function (product) {
                total += product.price;
                order.products.push(product._id);
                
            });

            order.total = total;
            order.created = Date.now();
            order.modified = Date.now();
            order.save(function(error) {
                if (error)
                    res.send(error);

                console.log(order);
                res.json({ message: 'Order created!' });
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
    return Order.findById(new mongoose.Types.ObjectId(req.params.id)).populate('products').exec(function (err,order) {
        if(err)
            res.send(err);
        
        res.json(order);
    })
})

module.exports = router;