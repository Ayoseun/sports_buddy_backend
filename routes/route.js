const express=require('express');
const multer=require('multer');
const upload =multer();
var bodyParser = require('body-parser')

 
// create application/json parser
var jsonParser = bodyParser.json()
const router=express.Router();
const Usercontroller=require('../controllers/controller')


//home route
router.get('/',Usercontroller.home);
//api routes
 router.post('/register',Usercontroller.createUser);
 router.post('/login',Usercontroller.login);
 router.post('/verify_user',Usercontroller.validateUser);
 router.patch('/forgot_password',Usercontroller.forgotPassword);
 router.post('/reset_password',Usercontroller.resetPassword);
 router.patch('/update_user',Usercontroller.updateUser);



module.exports=router;