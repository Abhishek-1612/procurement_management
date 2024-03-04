const mongoose = require('mongoose');
const validator = require('validator');
const helper = require('../config/helper');

const orderSchema = new mongoose.Schema({
    order_id: {
        type: String,
        required: true
    },
    procurement_manager_id: {
        type: String,
        required: true
    },
    checklist_id: {
        type: String,
        required: false,
        default: ""

    },
    order_status:{
        type: String,
        enum : [0,1,2,3],
        default: 0
    },
    created_at:{
        type: String,
        default: helper.microsecond()
    },
    updated_at:{
        type: String,
        default: ""
    }
})

const Order = new mongoose.model('Order',orderSchema);

module.exports = Order;