const { myQuery } = require('../database/config')
const { allLoggedUsers } = require('../helpers/allLoggedUsers')
const { onlyUsers } = require('../helpers/onlyusers')
const router = require('express').Router()

router.post('/login', async (req, res)=> {
    try{
        if(req.session.user){
            return res.status(400).send({err: true, 
            msg: "Please log out first"})
        }
        const {
            username, 
            password
        } =req.body
        if
            (!username || !password){
                return res.status(400).send({err: true,
                msg: "Missing Username or Password"})
            }
            
        const usertTable = await myQuery(`SELECT * FROM users WHERE username = "${username}" AND password = "${password}" `)

            if(!usertTable.length){
                return res.status(401).send({
                    err: true,
                    msg: "Wrong Username or Password"
                })
            }



        req.session.user = {
            userid: usertTable[0].userid,
            username,
            role: usertTable[0].role
        }

        res.send({
            msg: "You Logged In Successfully",
            username,
            role: JSON.stringify(usertTable[0].role)  
        })
    }

    catch (err){
        console.log(err)
        res.sendStatus(500)
    }
})

router.post('/register', async (req,res)=>{
    try {
        const {
            username,
            password,
            name,
            lastName
        }=req.body
if(!username || !password || !name || !lastName){
    return res.status(400).send({
        err: true,
        msg: "missing some info"
    })
}

const userNameCheck = await myQuery(`SELECT username FROM users WHERE username = "${username}"`)
if(userNameCheck.length){
    return res.status(400).send({
        err: true,
        msg: "This Username is Taken"
    }) 
}

await myQuery(`INSERT INTO users (username, password, name, lastName) VALUES ("${username}", "${password}", "${name}", "${lastName}")`)

res.status(201).send({
    msg: "user added successfully"
})

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

router.delete('/logout', (req, res)=> {
    req.session.destroy()
    res.send({
        msg: "disconnected successfully"
    }) 
})
module.exports = router