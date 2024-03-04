const mongoose = require('mongoose');
const validator = require('validator');
const helper = require('../config/helper');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default : null
    },
    email:{
        type:String,
        required:true,
        unique: [true , "Email Id Already Present"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid  Email")
            }
        }
    },
    mobile:{
        type: String,
        required : true
    },
    type:{
        type: Number,
        required: true,
        default : null
    },
    admin_id:{
        type: String,
        required: true,
        default : null
    },
    assigned_to:{
        type: String,
        required: false,
        default : ""
    },
    password: {
        type: String,
        required : true
    },
    created_at:{
        type: String,
        default: helper.microsecond()
    },
})

const User = new mongoose.model('User',userSchema);

module.exports = User;