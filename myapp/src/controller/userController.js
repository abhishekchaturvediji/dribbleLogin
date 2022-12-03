const Joi = require('joi');
const jwt = require('jsonwebtoken')

const { User } = require("../models")

const bcrypt = require('bcrypt');

// validatoion
// checks
// function
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
            console.log(":: error ::", error.details[0].message);
            req.flash('formValue',req.body)
            req.flash('error',error.details[0].message);
            return res.redirect(req.get('Referrer'))
        }

        console.log(":: User :: ", User);
        // already exists email 

        let emailAlreadyExist = await User.findOne({
            where : {
                email : reqParam.email
            }
        })


        if(emailAlreadyExist){
            req.flash('error','The email already exist');
            return res.redirect(req.get('Referrer'))
        }

        let userObj = {
            name : reqParam.name,
            email : reqParam.email,
            password : await bcrypt.hash(reqParam.password, 4),
            mobile_no : reqParam.mobile_no,
        }

        let userDetails = await User.create(userObj).catch(err => console.log(" err ", err))
        
        if(!userDetails){
            return res.status(500).send({message : 'Something went wrong'})
        }
        
        let payload = {
            id : userDetails.id,
            email : userDetails.email
        }

        let token = await module.exports.issueTokenToUser(payload);

        userDetails.token = token;
        await userDetails.save()

        console.log(":: hello hi ::", token);

        // await User.update({token : token},{
        //     where : {
        //         id : userDetails.id
        //     }
        // })
       
        return res.status(200).send({ data : userDetails, message : 'User registered successfully'})

    },

    // retrieve token for newly signed user
    issueTokenToUser : async(payload)=>{
        return jwt.sign({
            id : payload.id,
            email : payload.email
          }, 'private-key');
       
    },

    userLogin : async(req,res) =>{

        const reqParam = req.body;
        const schema = Joi.object({
            email: Joi.string().email().required().label('Email'),
            password: Joi.string().required().label('Password'),
        })

        const { error, value } = schema.validate(reqParam);

        if(error){
            console.log(":: error ::", error.details[0].message);
            req.flash('formValue',req.body)
            req.flash('error',error.details[0].message);
            return res.redirect(req.get('Referrer'))
        }

        // email check 
        let curEmailInfo = await User.findOne({where : {email : reqParam.email}})

        if(!curEmailInfo){
            req.flash('formValue',req.body)
            req.flash('error','Oops User does not exist, please register');
            return res.redirect(req.get('Referrer'))
        }


        const match = await bcrypt.compare(reqParam.password, curEmailInfo.password);

        console.log(" match :: " , match);

        //login
        if(match) {
            // localStorage.setItem('userData',curEmailInfo)
            return res.redirect(req.get('Referrer'))
        }
     
        
    }


}