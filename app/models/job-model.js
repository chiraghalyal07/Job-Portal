const mongoose = require('mongoose')
// const Recruiter = require('./recruiter-model')
const {Schema,model} = mongoose
const jobSchema = new Schema({
    title:String,
    description:String,
    recruiter:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
   
    openings:Number,
    location:[String],
    jobType:String,
    experience:{
        minExp:Number,
        maxExp:Number
    },
    dueDate:Date,
    skills:[String],
    salary:{
        minSalary:Number,
        maxSalary:Number
    }
    
},{timestamps:true})
const Job = model('Job',jobSchema)
module.exports = Job