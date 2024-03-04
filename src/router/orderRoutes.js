// import module Start
const express = require('express');
const router = new express.Router();
const orderController = require('../controller/oderController');
const auth = require("../middleware/auth");
// import module End

/* Route For create order */
router.post('/create_order',async (req,res,next) => {
    const orderData = await orderController.createOrder(req.body); //call controller function
    if(orderData){
        res.send(orderData);
    }
})


/* Route For get all order details */
router.post('/all_order',async (req,res) => {
    const orderData = await orderController.getAllOrder(); //call controller function
    if(orderData){
        res.send(orderData);
    }
})

/* Route For get order details using order id */
router.get('/get_order_status/:_id',async(req,res,next) => {
    const orderId = req.params._id;
    const orderData = await orderController.getOrderStatus(orderId); //call controller function
    if(orderData){
        res.send(orderData);
    }
})

/* Route For get order details using procurement manager id */
router.get('/get_procurement_order/:_id',async(req,res,next) => {
    const orderId = req.params._id;
    const orderData = await orderController.getAllOrderUsingManagerId(orderId); //call controller function
    if(orderData){
        res.send(orderData);
    }
})

/* Route For update order status*/
router.put('/update_order_status',async(req,res) => {
    const orderData = await orderController.updateOrderStatus(req.body); //call controller function
    if(orderData){
        res.send(orderData);
    }
})

module.exports = router;