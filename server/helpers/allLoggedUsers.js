module.exports.allLoggedUsers = (req, res, next) => {
    if(req.session.user){
        next()
    }else{
        res.status(401).send({err: true , msg:"please log in"})
    }
} 