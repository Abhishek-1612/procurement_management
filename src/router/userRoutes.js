// import module Start
const express = require('express');
const router = new express.Router();
const userController = require('../controller/userController');
const auth = require("../middleware/auth");
const multer = require('multer');

// import module End

/* Route for get All Backend Users */
router.get('/allUsers',auth, async(req,res,next) => {
    const userData = await userController.getAllRegisterUser(); //call controller function
    if(userData){
        res.send(userData);
    }
})

/* Route for get Register Users using admin_id*/
router.post('/register', auth ,async(req,res,next) => {
    const userData = await userController.createUsers(req.body); //call controller function
    if(userData){
        res.send(userData);
    }
})

/* Route Login Backend Users */
router.post('/login', async(req,res,next) => {
    const userData = await userController.loginAuth(req.body); //call controller function
    if(userData){
        res.send(userData);
    }
})

/* Route For get all Procurement Manager */
router.get('/get_all_procurement_manager', auth,async(req,res,next) => {
    const userData = await userController.getAllProcurementUsers(); //call controller function
    if(userData){
        res.send(userData);
    }
})

/* Route For get all Inspection Manager under the procurement manager using procurement manager id */
router.get('/get_inspection_manager/:_id', auth,async(req,res,next) => {
    const procurementId = req.params._id;
    const userData = await userController.getInspectionManager(procurementId); //call controller function
    if(userData){
        res.send(userData);
    }
})

/* Route For get all Inspection Manager */
router.get('/get_all_inspection_manager', auth,async(req,res,next) => {
    const userData = await userController.getAllInspectionManager(); //call controller function
    if(userData){
        res.send(userData);
    }
})


/* Route For Unassign Inspection Manager */
router.post('/unassign_inspection_manager', auth,async(req,res) => {
    const userData = await userController.unassignInspectionManager(req.body); //call controller function
    if(userData){
        res.send(userData);
    }
})

/* Route For assign Inspection Manager */
router.post('/assign_inspection_manager',auth, async(req,res) => {
    const userData = await userController.assignInspectionManager(req.body); //call controller function
    if(userData){
        res.send(userData);
    }
})

/* Upload Picture */
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "src");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
    },
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "png") {
      cb(null, true);
    } else {
      cb(new Error("Not a png File!!"), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

router.post('/file-upload', upload.single("myFile") ,async (req,res,next) => {
    try {
        // const newFile = await File.create({
        //   name: req.file.filename,
        // });
        // console.log(req.file);
        res.status(200).json({
          status: "success",
          message: "File created successfully!!",
          path: req.file.path
        });
    } catch (error) {
        res.json({
          status:"failed"
        });
    }
})


module.exports = router;