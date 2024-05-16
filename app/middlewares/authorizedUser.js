const authorizedUser = (permissions) =>{
    return (req, res, next) =>{
        if(permissions.includes(req.user.role)){
            next()
        }else{
            res.status(403).json({error:'you dont have the permission to access this route'})
        }
    }
}
module.exports = authorizedUser