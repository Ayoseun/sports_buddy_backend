const userModel = require('../model/model')
const sendMails = require('../services/mailer')
const generateOTP = require('../services/otp')




const home = (req, res, next) => {
    res.json("Ayo Solomon,test"
    );
}


const createUser = async (req, res, next) => {



    try {
        userModel.findOne({ email: req.body.email, }, (err, data) => {
            if (!data) {
                const newUser = new userModel({
                    name: req.body.name, email: req.body.email,
                    surname: req.body.surname,
                    middleName: req.body.middleName,
                    password: req.body.password,
                    phone: req.body.phone,
                    validated: false,
                    otp: generateOTP()


                })

                newUser.save((err, response) => {
                    if (err) return res.json({
                        Error: err
                    });
                    console.log(response)
                    sendMails(response['email'], response['otp'])
                    return res.json({
                        status: 200,
                        "data": response
                    });

                })
            } else {
                if (err) return res.json({
                    Error: 'something went wrong $err'
                });
                return res.json({
                    status: 302,
                    data: 'User already exist'
                });

            }
        })
    } catch (error) {
        return error;
    }

}

const login = (req, res, next) => {
    userModel.findOne({ email: req.body.email }, (err, data) => {
        if (data && data.password==req.body.password) {
            return res.json({
                status: 200,
                data: data
            });
        } else {
            if (err) return res.json({
                status: 500,
                Error: 'something went wrong $err'
            });
            return res.json({
                status: 404,
                error: 'User not found'
            });

        }
    })

};


const validateUser = (req, res, next) => {


    try {
        var user = userModel.findById({ _id: req.body.id },async (err, data) => {

            if (req.body.otp != data.otp) {
                return res.json({
                    status: 302,
                    error: 'Invalid OTP'
                });
            }
            if (req.body.otp == data.otp) {
                const id = data._id;
                // const otp = req.body;
                 const options = { new: true };
         
                 const result =await userModel.findByIdAndUpdate(
                     id,  {
                         $set: { validated:true },
                       }
                 )
         await result.save();

        
                return res.json({
                    status: 200,
                    data: result
                });
            } else {
                if (err) return res.json({
                    status: 500,
                    Error: 'something went wrong $err'
                });
    
    
                return res.json({
                    status: 404,
                    error: 'User not found'
                });
    
            }
        })
     
    } catch (error) {
        return res.json({
            status: 404,
            error: error
        });
    }
   
};



const forgotPassword = async(req, res) => {
    const otpGenerated = generateOTP();
    userModel.findOne({ email: req.body.email }, async (err, data) => {
   
        if (data) {
           
            try {
                const id = data._id;
               // const otp = req.body;
                const options = { new: true };
        
                const result =await userModel.findByIdAndUpdate(
                    id,  {
                        $set: { otp:otpGenerated },
                      }
                )
                sendMails(result['email'], otpGenerated)
                return res.json({
                    status: 200,
                    data: result
                });
            }
            catch (error) {
                res.status(400).json({ message: error.message })
            }

            
        } else {
            if (err) return res.json({
                status: 500,
                Error: 'something went wrong $err'
            });
            return res.json({
                status: 404,
                error: 'User not found'
            });

        }
    })

}

const resetPassword = async(req, res) => {
   try {
    userModel.findById({ _id: req.body.id }, async(err, data) => {

        if (!data) {
            return res.json({
                status: 302,
                error: 'Invalid Id'
            });
        }
        if (data) {

            const id = data._id;
            // const otp = req.body;
             const options = { new: true };
     
             const result =await userModel.findByIdAndUpdate(
                 id,  {
                     $set: { password:req.body.password },
                   }
             )
     
           await result.save()
           
            return res.json({
                status: 200,
                data: result
            });
        } else {
            if (err) return res.json({
                status: 500,
                Error: 'something went wrong $err'
            });


            return res.json({
                status: 404,
                error: 'User not found'
            });

        }
    })
   } catch (error) {
    
   }

}






const updateUser = async(req, res) => {
    try {
     userModel.findById({ _id: req.body.id }, async(err, data) => {
 
         if (!data) {
             return res.json({
                 status: 302,
                 error: 'Invalid Id'
             });
         }
         if (data) {
 
             const id = data._id;
             
      
              const result =await userModel.findByIdAndUpdate(
                  id,  {
                      $set: { username:req.body.username,email:req.body.email,name:req.body.name,surname:req.body.surname,phone:req.body.phone },
                    }
              )
      
           await  result.save();
 
             return res.json({
                 status: 200,
                 data: result
             });
         } else {
             if (err) return res.json({
                 status: 500,
                 Error: 'something went wrong $err'
             });
 
 
             return res.json({
                 status: 404,
                 error: 'User not found'
             });
 
         }
     })
    } catch (error) {
     
    }
 
 }
 

















module.exports = {
    home,
    createUser,
    login,
    validateUser,
    forgotPassword,
    resetPassword,
    updateUser


};