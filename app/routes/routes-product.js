/**
 * Created by sdonose on 5/30/2016.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product=mongoose.model('Product');

router.get('/product',function (req,res) {
    Product.find(function (err,product) {
        if(err)
            res.send(err);
        res.json(product);
    })
});

router.post('/product',function (req,res) {
    var product=new Product(req.body);
    product.name=req.body.name;
    product.quantity=req.body.quantity;
    product.price=req.body.price;
    product.stock+=product.quantity;
    product.created=Date.now();

    product.save(function (err) {
        if(err)
            res.send(err);
        res.json({message:'Product created!'});
    })
});

router.get('/product/:_id',function (req,res) {
    Product.findById(req.params._id,function (err,product) {
        if(err)
            res.send(err);
        res.json(product);
    })
});

router.put('/product/:_id',function (req,res) {
    Product.findById(req.params._id,function (err,product) {
        if(err)
            res.send(err);
        product.name=req.body.name;
        product.quantity=req.body.quantity;
        product.price=req.body.price;
        product.stock+=product.quantity;
        product.modified=Date.now();
        
        product.save(function (err) {
            if(err)
                res.send(err);

            res.json({message:'product updated!'});
        })
    })
});

router.delete(function (req,res) {
    Product.remove({
        _id:req.params._id
    },function (err,product) {
        if(err)
            res.send(err);
        res.json({message:'Successufully deleted'});
    });
});

module.exports = router;