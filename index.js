
const express = require('express')
require("dotenv").config()

const cors = require('cors')
const { connection } = require('./config/db.config')
const { userRouter } = require('./routes/user.router')
const { Auth } = require('./middleware/userAuth.middleware')
const { socialRouter } = require('./routes/social.router')

const app = express()

app.use(express.json())
app.use(cors({ origin: "*" }))

app.get('/', (req, res) => {
    res.send("welcome to default page of social app")

})
app.use('/users', userRouter)
app.use(Auth)
app.use('/posts',socialRouter)

app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log("connected to db")
    } catch (err) {
        console.log(err)
    }
    console.log(`http://localhost:${process.env.PORT}`)
})