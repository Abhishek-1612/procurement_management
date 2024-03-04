const mongoose = require('mongoose');
const Order = require('../model/order');
const User = require('../model/user');
const Checklist = require('../model/checklist');
const helper = require('../config/helper');
const {v4 : uuidv4} = require('uuid');
module.exports = {
    createChecklist: async (checklistData) => {
        // console.log(checklistData);
        var check_fields = await validate_checklist(checklistData);
        if (check_fields) {
            return check_fields;
        }else {
            const checklistId = uuidv4();
            const checklistArr = helper.explode(checklistData.checklist);
            const insertData = await Checklist.create({
                procurement_manager_id: checklistData.manager_id,
                checklist_id: checklistId,
                checklist_fields: checklistArr
            });
            return {"status":"1","message":"Checklist Created Successfully","data":insertData};
        }
    },
    getAllChecklist: async(manager_id) => {
        try{
			const data = await Checklist.find({procurement_manager_id: manager_id},{_id:0});
            if(empty(data)){
                return {"status":"0","message":"No Data Found","data":data};
            }else{
                return {"status":"1","message":"Data Found","data":data};
            }
	    }catch(error){
	        return error
	    }
	},

    getChecklist: async(checklistId) => {
        try{
			const data = await Checklist.find({checklist_id: checklistId});
            if(empty(data)){
                return {"status":"0","message":"No Data Found","data":data};
            }else{
                return {"status":"1","message":"Data Found","data":data};
            }
	    }catch(error){
	        return error
	    }
	},

    addAnswer: async(answer) => {
        var check_fields =  validate_answer(answer);
        if (check_fields) {
            return check_fields;
        }else {
            try{
                const data = await Checklist.findOne({checklist_id: answer.checklist_id});
                var checklistArr = data.checklist_fields;
                delete (answer.checklist_id);
                var answerArr = Object.keys(answer);
                if(JSON.stringify(answerArr)==JSON.stringify(checklistArr)){
                    console.log(answer);
                    const updatedData = await Checklist.updateOne({checklist_id:data.checklist_id},{$set : {answer:answer}});
                    return {"status":"0","message":"Answer Added Successfully","data":answer};
                }else{
                    return {"status":"0","message":"Checklist Not Matched. You need to create another checklist","data":[]};
                }
            }catch(err){
                return err
            }
        }
	}
}

async function validate_checklist(checklistData) {

    if (empty(checklistData)) {
        return {status: 0, message: 'Please provide some inputs'};
    }
    
    if (helper.validate_field('manager_id', checklistData.manager_id)) {
        return helper.validate_field('manager_id', checklistData.manager_id);
    }

    if (helper.validate_field('checklist', checklistData.checklist)) {
        return helper.validate_field('checklist', checklistData.checklist);
    }

    const checkAuthUser = await User.findOne({admin_id: checklistData.manager_id});
    if(!empty(checkAuthUser)){
        if(checkAuthUser.type != 2){
            return {status: 0, message: "You don't have permission to create checklist"};
        }
    }else{
        return {status: 0, message: "You'r not registered with us"};
    }
    
    
    return false;
}

function validate_answer(answer){
    if (empty(answer)) {
        return {status: 0, message: 'Please provide some inputs'};
    }
    
    if (helper.validate_field('checklist_id', answer.checklist_id)) {
        return helper.validate_field('checklist_id', answer.checklist_id);
    }

    return false;

}
