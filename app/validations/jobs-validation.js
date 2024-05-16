const Job = require('../models/job-model')
const jobValidationSchema = {
    title:{
        in:['body'],
        isString:{
            errorMessage:'title should be in String'
        },
        exists:{
            errorMessage:'title is required'
        },
        notEmpty:{
            errorMessage:'title cannot be empty'
        },
        trim:true
    },
    description:{
        in:['body'],
        isString:{
            errorMessage:'description should be in String'
        },
        exists:{
            errorMessage:'description is required'
        },
        notEmpty:{
            errorMessage:'description cannot be empty'
        },
        trim:true
    },
    // recruiter:{
    //     in:['body'],
    //     notEmpty:{
    //         errorMessage:'recruiter cannot be empty'
    //     },
    //     trim:true
    // },
    openings:{
        in:['body'],
        isNumeric:{
            errorMessage:'Opening should be in Number'
        },
        exists:{
            errorMessage:'Opening is required'
        },
        notEmpty:{
            errorMessage:'Opening cannot be empty'
        },
        trim:true
    },
    location:{
        in:['body'],
        exists:{
            errorMessage:'location is required'
        },
        notEmpty:{
            errorMessage:'location cannot be empty'
        },
        trim:true,
        custom:{
            options: function(value){
                if(!Array.isArray(value)){
                    return new Error('location should be in array')
                }
                return true
            }
        }
    },
    jobType:{
        in:['body'],
        exists:{
            errorMessage:'jobtype is required'
        },
        notEmpty:{
            errorMessage:'jobType cannot be Empty'
        },
        trim:true,
        isIn:{
            options:[['wfh','wfo','hybrid']],
            errorMessage:'Should be either of wfh, wfo or hybrid'
        }
    },
    'experience.minExp':{
        in:['body'],
        exists:{
            errorMessage:'Min Experience is required'
        },
        isNumeric:{
            options:{min:0},
            errorMessage:'min experience should be 0'
        },
        notEmpty:{
            errorMessage:'Min Experience cannot be empty'
        },
        trim:true
    },
    'experience.maxExp':{
        in:['body'],
        exists:{
            errorMessage:'Max Experience is required'
        },
        isNumeric:{
            errorMessage:'Max experience should be a number'
        },
        notempty:{
            errorMessage:'Max Experience cannot be empty'
        },
        trim:true
    },
    dueDate:{
        in:['body'],
        exists:{
            errorMessage:'dueDate is required'
        },
        notEmpty:{
            errorMessage:'dueDate cannot be empty'
        },
        trim:true,
        custom:{
            options: function(value){
                if(new Date(value)<new Date()){
                    throw new Error('Due Date should be greater than todays date')
                }else{
                    return true
                }
            }
        }
    },
    skills:{
        in:['body'],
        exists:{
            errorMessage:'skills is required'
        },
        notEmpty:{
            errorMessage:'skills cannot be empty'
        },
        trim:true,
        custom:{
            options:function(value){
                if(!Array.isArray(value)){
                    throw new Error('Skills should be provided')
                }
                if(value.length == 0){
                    throw new Error('this field should consists atleast one skill')
                }
                return true
            }

        }
    },
    'salary.minSalary':{
        in:['body'],
        exists:{
            errorMessage:'Min Package is required'
        },
        notEmpty:{
            errorMessage:'Min Package cannot be empty'
        },
        isNumeric:{
            errorMessage:'min salary should be a number'
        },
        trim:true
    },
    'salary.maxSalary':{
        in:['body'],
        exists:{
            errorMessage:'Max Package is required'
        },
        notEmpty:{
            errorMessage:'Max Package cannot be empty'
        },
        isNumeric:{
            errorMessage:'max salary should be a number'
        },
        trim:true,
        custom:{
            options: function(value,{req}){
                console.log(value,req.body)
                if(Number(value)<Number(req.body.salary.minSalary)){
                    throw new Error('max salary should be greater than min salary')
                }
                return true
            }
        }
    }
}
module.exports = jobValidationSchema