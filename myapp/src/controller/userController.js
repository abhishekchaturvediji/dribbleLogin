const Joi = require('joi');


// validation
// checks
// third process
// response

module.exports = {

    userRegister : async(req,res) =>{

        const reqParam = req.body;

        const schema = Joi.object({
            name: Joi.string().min(1).max(30).required().label('Name'),
            email: Joi.string().email().required().label('Email'),
            password: Joi.string().required().label('Password'),
            confirm_password: Joi.ref('password'),
            mobile_no: Joi.number().optional().label('Mobile Number'),
        })

        const { error, value } = schema.validate(reqParam);

        if(error){
            console.log(" error :: ", error.details[0].message);
        }

        

    },

}