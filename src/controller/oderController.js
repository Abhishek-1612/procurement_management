const mongoose = require('mongoose');
const Order = require('../model/order');
const User = require('../model/user');
const {v4 : uuidv4} = require('uuid');
module.exports = {
    createOrder: async (orderData) => {
        var check_flieds = await validate_order(orderData);
        if (check_flieds) {
            return check_flieds;
        }else {
            const orderId = uuidv4();
            const insertData = await Order.create({
                order_id:orderId,
                procurement_manager_id: orderData.manager_id,
                checklist_id:orderData.checklist_id
            });
            return {"status":"1","message":"Order Created Successfully","data":insertData};
        }
    },
    getAllOrder: async() => {
		try{
			const data = await Order.find();
            if(empty(data)){
                return {"status":"1","message":"You hav't place any order yet","data":data};
            }else{
                return {"status":"1","data":data};
            }
	    }catch(error){
	        return error
	    }
	},

    getOrderStatus: async(_id) => {
		try{
			const data = await Order.find({order_id: _id});
            if(empty(data)){
                return {"status":"1","message":"You hav't place any order yet","data":data};
            }else{
                var newdata = helper.parse_rawdata(data);
                if(newdata.order_status == 0){
                    newdata.order_status = "Pending";
                }else if(newdata.order_status == 1){
                    newdata.order_status = "In Progress";
                }else if(newdata.order_status == 2){
                    newdata.order_status = "In QA";
                }else if(newdata.order_status == 3){
                    newdata.order_status = "Delivered";
                }
                return {"status":"1","message":"Order List","data":newdata};
            }
	    }catch(error){
	        return error
	    }
	},
    getAllOrderUsingManagerId: async(_id) => {
		try{
			const data = await Order.find({procurement_manager_id: _id});
            if(empty(data)){
                return {"status":"1","message":"You hav't place any order yet","data":data};
            }else{
                return {"status":"1","data":data};
            }
	    }catch(error){
	        return error
	    }
	},
    updateOrderStatus: async(orderdata) => {
		try{
            const update_time = helper.microsecond();
            const updatedData = await Order.updateOne({order_id:orderdata.order_id},{$set : {order_status:orderdata.order_status,updated_at:update_time}});
			return {"status":"1","Messge":"Status Updated"};
	    }catch(error){
	        return error
	    }
	},
}

async function validate_order(orderData) {

    if (empty(orderData)) {
        return {status: 0, message: 'Please provide some inputs'};
    }
    
    if (helper.validate_field('manager_id', orderData.manager_id)) {
        return helper.validate_field('manager_id', orderData.manager_id);
    }

    if (helper.validate_field('checklist_id', orderData.checklist_id)) {
        return helper.validate_field('checklist_id', orderData.checklist_id);
    }

    const checkAuthUser = await User.findOne({admin_id: orderData.manager_id});
    if(!empty(checkAuthUser)){
        if(checkAuthUser.type != 2){
            return {status: 0, message: "You don't have permission to create order"};
        }
    }else{
        return {status: 0, message: "Not registered with us"};
    }
   
    
    return false;
}
