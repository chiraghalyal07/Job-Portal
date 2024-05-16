// const { connections } = require("mongoose");
const Recruiter = require('../models/recruiter-model')
const recruiterValidationSchema ={
    userId: {
        custom: {
            options: async function(value, { req }){
                const recruiter = await Recruiter.findOne({ userId: req.user.id })
                if(recruiter) {
                    throw new Error('Profile already created')
                } else {
                    return true 
                }
            }
        }
    },
    companyName:{
        in:['body'],
        isString:{
            errorMessage:'companyName should be in String'
        },
        exists:{
            errorMessage:'companyName is required'
        },
        notEmpty:{
            errorMessage:'companyName cannot be empty'
        },
        trim:true
    },
    email:{
        in:['body'],  
        isString:{
            errorMessage:'email should be in String'
        },
        exists:{
            errorMessage:'email is required'
        },
        notEmpty:{
            errorMessage:'email cannot be empty'
        },
        trim:true
    },
    website:{
        in:['body'],
        isString:{
            errorMessage:'website should be in String'
        },
        exists:{
            errorMessage:'website is required'
        },
        notEmpty:{
            errorMessage:'website cannot be empty'
        }
    },
    address:{
        in:['body'],  
        isString:{
            errorMessage:'address should be in String'
        },
        exists:{
            errorMessage:'address is required'
        },
        notEmpty:{
            errorMessage:'address cannot be empty'
        },
        trim:true
    }
}
const recruiterEditValidationSchema={
    
    companyName:{
        in:['body'],
        isString:{
            errorMessage:'companyName should be in String'
        },
        exists:{
            errorMessage:'companyName is required'
        },
        notEmpty:{
            errorMessage:'companyName cannot be empty'
        },
        trim:true
    },
    email:{
        in:['body'],  
        isString:{
            errorMessage:'email should be in String'
        },
        exists:{
            errorMessage:'email is required'
        },
        notEmpty:{
            errorMessage:'email cannot be empty'
        },
        trim:true
    },
    website:{
        in:['body'],
        isString:{
            errorMessage:'website should be in String'
        },
        exists:{
            errorMessage:'website is required'
        },
        notEmpty:{
            errorMessage:'website cannot be empty'
        }
    },
    address:{
        in:['body'],  
        isString:{
            errorMessage:'address should be in String'
        },
        exists:{
            errorMessage:'address is required'
        },
        notEmpty:{
            errorMessage:'address cannot be empty'
        },
        trim:true
    }

}
module.exports = {recruiterValidationSchema,recruiterEditValidationSchema}