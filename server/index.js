//imports
const express = require('express')
const session = require('express-session')
const cors = require('cors')

//init 
const app = express()

//middlewares
app.use(express.json())
app.use(session({
    secret: "why so cat!?",
    cookie:{
        maxAge: 1000*60**60*24*30
    } 
})) 
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))









app.use('/users', require('./routes/users'))
app.use('/vacations', require('./routes/vacations'))
app.listen(1000, ()=> console.log("Server Up And Running 😊"))