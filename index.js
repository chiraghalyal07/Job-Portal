require('dotenv').config()
const morgan = require('morgan') 
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const express = require('express')
const {checkSchema}= require('express-validator')
const configureDB = require('./config/db')
const userRegisterValidationSchema = require('./app/validations/user-register-validations')
const userLoginValidationSchema = require('./app/validations/user-login-validation')
const {candidateValidationSchema,candidateEditValidationSchema} = require('./app/validations/candidate-validation')
const {recruiterValidationSchema,recruiterEditValidationSchema} = require('./app/validations/recruiter-validation')
const {applicationValidationSchema} = require('./app/validations/application-validation')
const jobValidationSchema=require('./app/validations/jobs-validation')
const usersCltr= require('./app/controllers/users-cltr')
const jobsCltr = require('./app/controllers/jobs-cltr')
const applicationsCltr = require('./app/controllers/application-cltr')
const candidateCltr = require('./app/controllers/candidates-cltr')
const recruiterCltr = require('./app/controllers/recruiters-cltr')
const authenticateUser = require('./app/middlewares/authenticateUser')
const authorizedUser = require('./app/middlewares/authorizedUser')
const app = express()
const port = 3333

configureDB()
app.use(express.json())
app.use(cors())
/*
//appilication level middleware - using it for logging request for debuging purpose
app.use(function(req,res,next){
    console.log(`${req.ip} - ${req.method} - ${req.url} - ${new Date()}`)
    next()
})
*/
//write logs to a file Using Morgan
app.use(morgan(':method :url :status :res[content-length] - :response-time ms' /* 'common '*/, {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
  }))

app.post('/users/register',checkSchema(userRegisterValidationSchema),usersCltr.register)
app.post('/users/login', checkSchema(userLoginValidationSchema), usersCltr.login)
//routing level middleware
app.get('/users/account',authenticateUser, usersCltr.account)
app.get('/users/checkemail',usersCltr.checkEmail)

app.get('/api/jobs',jobsCltr.list)
app.get('/api/jobs/my',authenticateUser,authorizedUser(['recruiter']),jobsCltr.my)
app.get('/api/jobs/:id',jobsCltr.show)
app.get('/api/jobs/:id/applications',authenticateUser,authorizedUser(['recruiter']),jobsCltr.applications)
app.get('/api/jobs/:id/applications/:appId',authenticateUser,authorizedUser(['recruiter']),jobsCltr.singleApplication)
app.put('/api/jobs/:id/applications/:appId',authenticateUser,authorizedUser(['recruiter']),jobsCltr.applicationUpdate)

app.post('/api/jobs',authenticateUser,authorizedUser(['recruiter']),checkSchema(jobValidationSchema),jobsCltr.create)
app.delete('/api/jobs/:id', authenticateUser, authorizedUser(['recruiter']), jobsCltr.remove)
app.put('/api/jobs/:id', authenticateUser, authorizedUser(['recruiter']), checkSchema(jobValidationSchema), jobsCltr.update)

//Candidate
app.post('/api/candidate/profile', authenticateUser, authorizedUser(['candidate']), checkSchema(candidateValidationSchema), candidateCltr.create)
app.get('/api/candidate/profile',authenticateUser,authorizedUser(['candidate']), candidateCltr.show)
app.put('/api/candidate/profile', authenticateUser,authorizedUser(['candidate']),checkSchema(candidateEditValidationSchema),candidateCltr.update)
//Recruiter
app.post('/api/recruiter/profile',authenticateUser,authorizedUser(['recruiter']),checkSchema(recruiterValidationSchema),recruiterCltr.create)
app.get('/api/recruiter/profile',authenticateUser,authorizedUser(['recruiter']),recruiterCltr.show)
app.put('/api/recruiter/profile',authenticateUser,authorizedUser(['recruiter']),checkSchema(recruiterEditValidationSchema),recruiterCltr.update)
// app.delete('/users/account', usersCltr.logout)
//jobs
// app.post('/api/job',authenticateUser)
//application
app.post('/api/applications',authenticateUser,authorizedUser(['candidate']),checkSchema(applicationValidationSchema),applicationsCltr.apply)
app.get('/api/applications/check/:jobId',authenticateUser,authorizedUser(['candidate','recruiter']),applicationsCltr.check)
app.get('/api/applications',authenticateUser,authorizedUser(['recruiter']),applicationsCltr.list)

app.listen(port,() =>{
    console.log('server running on',port)
})