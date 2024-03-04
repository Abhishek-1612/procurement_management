const mongoose = require('mongoose');
const validator = require('validator');
const helper = require('../config/helper');

const checkListSchema = new mongoose.Schema({
    procurement_manager_id: {
        type: String,
        required: true
    },
    checklist_id: {
        type: String,
        required: true,
        default: ""
    },
    checklist_fields: {
        type: Array,
        required: true,
        default: ""
    },
    answer: {
        type: Object,
        required: false,
        default: ""
    },
    created_at:{
        type: String,
        default: helper.microsecond()
    }
})

const Checklist = new mongoose.model('Checklist',checkListSchema);

module.exports = Checklist;