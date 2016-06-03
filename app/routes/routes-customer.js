/**
 * Created by sdonose on 5/30/2016.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Customer=mongoose.model('Customer');

router.get('/customer',function (req,res) {
    Customer.find(function (err,customer) {
        if(err)
            res.send(err);
        res.json(customer);
    })
});

router.post('/customer',function (req,res) {
    var customer=new Customer(req.body);
    customer.save(function (err) {
        if(err)
            res.send(err);
        res.json({message:'Customer created!'});
    })
});

// router.get('/customer/:_id',function (req,res) {
//     Customer.findById(req.params._id).populate('order').exec(function (err,customer) {
//         if(err)
//             res.send(err);
//         res.json(customer);
//     })
// });
router.get('/customer/:id',function (req,res) {
    return Customer.findById(new mongoose.Types.ObjectId(req.params.id))
        .populate('orders')
        .exec(function (err,customer) {
            if(err)
                res.send(err);

            res.json(customer);
        })
});

router.put('/customer/:_id',function (req,res) {
    Customer.findById(req.params._id,function (err,customer) {
        if(err)
            res.send(err);
        customer.name=req.body.name;
        customer.address=req.body.address;
        customer.telephone=req.body.telephone;
        customer.email=req.body.email;


        product.save(function (err) {
            if(err)
                res.send(err);

            res.json({message:'product updated!'});
        })
    })
});

router.delete(function (req,res) {
    Customer.remove({
        _id:req.params._id
    },function (err,customer) {
        if(err)
            res.send(err);
        res.json({message:'Successufully deleted'});
    });
});

module.exports = router;