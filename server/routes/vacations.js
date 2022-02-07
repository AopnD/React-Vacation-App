const {
    myQuery
} = require('../database/config')
const {
    allLoggedUsers
} = require('../helpers/allLoggedUsers')
const {
    onlyAdmin
} = require('../helpers/onlyAdmin')
const {
    onlyUsers
} = require('../helpers/onlyUsers')
const router = require('express').Router()


router.get('/', allLoggedUsers, async (req, res) => {
    try {

        const bridgeTable = await myQuery(`SELECT * FROM vacation INNER JOIN bridge ON vacationid = bridge.vacID where userID =  ${req.session.user.userid};`)
        const bridgeid = bridgeTable.map(id => {
            return id.vacID
        })
        const vacationTable = await myQuery(`SELECT * FROM vacation`)
        const fillteredVac = vacationTable.filter(vacation => !bridgeid.includes(vacation.vacationid))
        const showTable = [...bridgeTable, ...fillteredVac]
        res.status(200).send(showTable)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

router.post('/add', onlyAdmin, async (req, res) => {
    try {
        const {
            destination,
            price,
            pictureurl,
            description,
            dates
        } = req.body
        if (!destination || !price || !pictureurl || !description || !dates) {
            return res.status(400).send({
                err: true,
                msg: "Hey Admin, Please Fill All The Details! 😘"
            })
        }
        await myQuery(`INSERT INTO vacation(destination, price, pictureurl, description, dates)VALUES("${destination}", ${price} , "${pictureurl}","${description}","${dates}")`)
        res.send({
            msg: "Vacation Added"
        })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

router.post('/remove/:id', onlyAdmin, async (req, res) => {
    try {
        const {
            id
        } = req.params
        const vacationCheck = await myQuery(`SELECT * FROM vacation WHERE vacationid = ${id}`)
        if (!vacationCheck.length) {
            return res.status(400).send({
                err: true,
                msg: "Please Selecet A Valid Vacation "
            })
        }
        await myQuery(`DELETE FROM vacation WHERE vacationid = ${id}`)
        await myQuery(`DELETE FROM bridge WHERE vacID =${id}`)
        res.status(201).send({
            msg: "Vacation Removed Successfully"
        })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

router.put('/follow/:id', onlyUsers, async (req, res) => {
    try {
        const {
            id
        } = req.params
        const vacationTable = await myQuery(`SELECT * FROM vacation WHERE vacationid = ${id}`)
        if (!vacationTable.length) {
            return res.status(400).send({
                err: true,
                msg: "Vacation not Found"
            })
        }
        const unfollow = await myQuery(`SELECT * FROM bridge where userID = ${req.session.user.userid} AND vacID = ${id} `)
        if (unfollow.length) {
            await myQuery(`DELETE FROM bridge WHERE userID = ${req.session.user.userid} AND vacID = ${id}`)
            return res.send("Unfollowed Successfully")
        }

        await myQuery(`INSERT INTO bridge (userID,vacID) VALUES("${req.session.user.userid}", "${id}")`)
        res.send("Followed Successfully")
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

router.get('/search/:destination', allLoggedUsers, async (req, res) => {
    try {
        const {
            destination
        } = req.params
        const singelvacation = await myQuery(`SELECT * FROM vacation WHERE destination LIKE "%${destination}%"`)
        if (!singelvacation.length) {
            res.status(400).send({
                err: true,
                msg: "Please choose Valid vacation"
            })
        }
        res.status(200).send(singelvacation)

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

router.get('/singelvacation/:id', onlyAdmin, async (req, res) => {
    try {
        const {
            id
        } = req.params
        const singelvacation = await myQuery(`SELECT * FROM vacation WHERE vacationid = ${id}`)
        if (!singelvacation.length) {
            res.status(400).send({
                err: true,
                msg: "Please enter a valid vacation"
            })
        }
        res.status(200).send(singelvacation)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

router.get('/showstatistics', onlyAdmin, async (req, res) => {
    try {
        const vacationStatistic = await myQuery("SELECT vacation.destination , COUNT(vacID) AS bridge FROM vacation INNER JOIN bridge  ON vacation.vacationid = vacID GROUP BY vacID")
        res.status(200).send(vacationStatistic)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})


router.put('/edit/:id', onlyAdmin, async (req, res)=>{
 try {
    const {id} = req.params
    const {destination, price , pictureurl, description, dates} = req.body
    if(!destination || !price || !pictureurl || !description || !dates){
return  res.status(400).send({err: true, msg: req.body}) 
    }
    await myQuery(`UPDATE vacation SET destination = "${destination}" , price = ${price}, pictureurl = "${pictureurl}", description = "${description}" , dates = "${dates}" WHERE vacation.vacationid = ${id}`)
    res.status(200).send("vacation Updated")
 } catch (error) {
     console.log(error)
     res.sendStatus(500) 
 }
})

module.exports = router 