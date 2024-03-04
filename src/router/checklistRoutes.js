// import module Start
const express = require('express');
const checklistController = require('../controller/checklistController');
const router = new express.Router();
const orderController = require('../controller/oderController');
const auth = require("../middleware/auth");

// import module End

/* Route For create order */
router.post('/create_checklist',async (req,res) => {
    const checklistData = await checklistController.createChecklist(req.body); //call controller function
    if(checklistData){
        res.send(checklistData);
    }
})


/* Route For get all checklist details by procurement manager id*/
router.get('/all_checklist/:id',async (req,res) => {
    const manager_id = req.params.id;
    const orderData = await checklistController.getAllChecklist(manager_id); //call controller function
    if(orderData){
        res.send(orderData);
    }
})

/* Route For get checklist details by checklist id*/
router.get('/checklist/:id',async (req,res) => {
    const checklistId = req.params.id;
   
    const orderData = await checklistController.getChecklist(checklistId); //call controller function
    if(orderData){
        res.send(orderData);
    }
})

/* Route For Post Answer */
router.post('/add_answer',async (req,res) => {
    const checklistData = await checklistController.addAnswer(req.body); //call controller function
    if(checklistData){
        res.send(checklistData);
    }
})

module.exports = router;