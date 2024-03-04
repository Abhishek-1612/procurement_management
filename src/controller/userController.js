const mongoose = require('mongoose');
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const helper = require('../config/helper');
const dotenv = require('dotenv');

// Set up Global configuration access
dotenv.config();

module.exports = {
    /* Function for create order */
    createUsers: async (userData) => {
        var check_flieds = validate_signup(userData);
        if (check_flieds) {
            return check_flieds;
        }else {
            const checkAuthUser = await User.findOne({admin_id: userData.id});
            if(userData.type == 3){
                var oldUser = await User.findOne({mobile: userData.mobile});
            }else{
                var oldUser = await User.findOne({email: userData.email});
            }
            if(oldUser){
                return {"status":"0","message":"User Already Exist Please Contact To Admin"};
            }else{
                if(!empty(checkAuthUser)){
                    if(checkAuthUser.type == 2 || checkAuthUser.type == 0){
                        if(checkAuthUser.type == userData.type){
                            return {"status":"0","message":"You Can't Create Procurement Manager"};
                        }
                        
                        const password = userData.password;
                        encryptedPassword = await bcrypt.hash(password,10);
                        const insertData = await User.create({
                            name: userData.name,
                            email: userData.email.toLowerCase(),
                            password: encryptedPassword,
                            mobile:userData.mobile,
                            admin_id:helper.rand('999999','000000'),
                            assigned_to:userData.id,
                            type: userData.type
                        });
                        return {"status":"1","message":"User Successfully Regsitered","data":insertData};
                        
                    }else{
                        return {"status":"0","message":"You Don't Have Permission"};
                    }
                }else{
                    return {"status":"0","message":"You Don't Have Permission"};
                }
            }
        }
    },

    /* Function for login */
    loginAuth: async (userData) => {
        var user;
        var check_flieds = validate_login(userData);
        if (check_flieds) {
            return check_flieds;
        }else {
            if(userData.type != 3){
                user = await User.findOne({email: userData.username, type: userData.type});
            }else{
                user = await User.findOne({mobile: userData.mobile, type: userData.type});
            }
            
            if(user && (await bcrypt.compare(userData.password, user.password))){
                const token = jwt.sign(
                    { user_id: user._id, email:user.email },
                    process.env.TOKEN_KEY,
                    {
                      expiresIn: "2h",
                    }
                  );
                  
                  // save user token
                return {"status":"1","message":"login success","data":user,"jwt":token}
            }else{
                return {"status":"0","message":"Invalid Username Or Password"}
            }
        }
    },

    /* Function for Get Users */
    getAllRegisterUser: async() => {
		try{
			const data = await User.find({},{_id:0,password:0});
			return {"status":"1","data":data};
	    }catch(error){
	        return error
	    }
	},

    /* Function for Get Procurment Manager */
    getAllProcurementUsers:async() => {
		try{
			const data = await User.find({type: 2});
			return {"status":"1","data":data};
	    }catch(error){
	        return error
	    }
	},

    /* Function for Get Inspection Manager Using Procurement Manager ID*/
    getInspectionManager: async(_id) => {
		try{
			const data = await User.find({assigned_to: _id, type: 3});
			return {"status":"1","message":"Data Found","data":data};
	    }catch(error){
	        return error
	    }
	},

     /* Function for Get Inspection Manager */
    getAllInspectionManager: async() => {
		try{
			const data = await User.find({type: 3});
			return {"status":"1","data":data};
	    }catch(error){
	        return error
	    }
	},
    
    /* Function for unassign Inspection Manager */
    unassignInspectionManager: async(data) => {
		try{
            const updatedData = await User.updateOne({admin_id:data.id},{$set : {assigned_to:""}});
			return {"status":"1","Messge":"User Unassigned"};
	    }catch(error){
	        return error
	    }
	},

    /* Function for assign Inspection Manager */
    assignInspectionManager: async(data) => {
        var check_flieds = validate_assign_inspection(data);
        if (check_flieds) {
            return check_flieds;
        }else {
            try{
                const updatedData = await User.updateOne({admin_id:data.inspection_id},{$set : {assigned_to:data.procurement_id}});
                return {"status":"1","message":"User Assigned To Procurement Manager"};
            }catch(error){
                return error
            }
        }
	},

}

/* Function for Validate Registration */
function validate_signup(user_data) {
    if (user_data.type == 0) {
        return {status: 0, message: 'You can not create super admin again'};
    }

    if (empty(user_data)) {
        return {status: 0, message: 'Please provide some inputs'};
    }

    if (helper.validate_field('name', user_data.name)) {
        return helper.validate_field('name', user_data.name);
    }

    if (helper.validate_field('email', user_data.email)) {
        return helper.validate_field('email', user_data.email);
    }

    if (helper.validate_field('mobile', user_data.mobile)) {
        return helper.validate_field('mobile', user_data.mobile);
    }

    if (helper.validate_field('password', user_data.password)) {
        return helper.validate_field('password', user_data.password);
    }

    if (helper.validate_field('user_type', user_data.type)) {
        return helper.validate_field('user_type', user_data.type);
    }
    
    return false;
}

/* Function for Validate Login */
function validate_login(user_data) {

    if (empty(user_data)) {
        return {status: 0, message: 'Please provide some inputs'};
    }
    
    if (helper.validate_field('type', user_data.type)) {
        return helper.validate_field('type', user_data.type);
    }

    if(user_data.type != 3){
        if (helper.validate_field('username', user_data.username)) {
            return helper.validate_field('username', user_data.username);
        }
    }else{
        if (helper.validate_field('mobile', user_data.mobile)) {
            return helper.validate_field('mobile', user_data.mobile);
        }
    }
    


    if (helper.validate_field('password', user_data.password)) {
        return helper.validate_field('password', user_data.password);
    }
    
    return false;
}

/* Function for Assign Inspection Manager */
function validate_assign_inspection(user_data) {

    if (empty(user_data)) {
        return {status: 0, message: 'Please provide some inputs'};
    }
    
    if (helper.validate_field('procurement_id', user_data.procurement_id)) {
        return helper.validate_field('procurement_id', user_data.procurement_id);
    }

    if (helper.validate_field('inspection_id', user_data.inspection_id)) {
        return helper.validate_field('inspection_id', user_data.inspection_id);
    }
    
    return false;
}
