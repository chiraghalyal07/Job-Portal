const Candidate = require('../models/candidate-model')
const candidateValidationSchema ={
    userId: {
        custom: {
            options: async function(value, { req }){
                const candidate = await Candidate.findOne({ userId: req.user.id })
                if(candidate) {
                    throw new Error('Profile already created')
                } else {
                    return true 
                }
            }
        }
    },
    firstName:{
        in:['body'],
        isString:{
            errorMessage:'firstName should be in String'
        },
        exists:{
            errorMessage:'firstName is required'
        },
        notEmpty:{
            errorMessage:'firstName cannot be empty'
        },
        trim:true
    },
    lastName:{
        in:['body'],  
        isString:{
            errorMessage:'lastName should be in String'
        },
        exists:{
            errorMessage:'lastName is required'
        },
        notEmpty:{
            errorMessage:'lastName cannot be empty'
        },
        trim:true
    },
    mobile:{
        isNumeric:{
            errorMessage:'mobile should be in number'
        },
        isLength:{
            options:{min:10,max:10},
            errorMessage:'mobile number shoule be 10 digits long'
        },
        exists:{
            errorMessage:'mobile is required'
        },
        notEmpty:{
            errorMessage:'mobile cannot be empty'
        },
       custom: {
            options: async function(value){
                const candidate = await Candidate.findOne({ mobile: value})
                if(candidate) {
                    throw new Error('Mobile already exists')
                } else {
                    return true 
                }
            }
        },
        trim:true
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
const candidateEditValidationSchema={
    firstName:{
        in:['body'],
        isString:{
            errorMessage:'firstName should be in String'
        },
        exists:{
            errorMessage:'firstName is required'
        },
        notEmpty:{
            errorMessage:'firstName cannot be empty'
        },
        trim:true
    },
    lastName:{
        in:['body'],  
        isString:{
            errorMessage:'lastName should be in String'
        },
        exists:{
            errorMessage:'lastName is required'
        },
        notEmpty:{
            errorMessage:'lastName cannot be empty'
        },
        trim:true
    },
    mobile:{
        isNumeric:{
            errorMessage:'mobile should be in number'
        },
        isLength:{
            options:{min:10,max:10},
            errorMessage:'mobile number shoule be 10 digits long'
        },
        exists:{
            errorMessage:'mobile is required'
        },
        notEmpty:{
            errorMessage:'mobile cannot be empty'
        },
        trim:true
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
module.exports = {candidateValidationSchema,candidateEditValidationSchema}