require("dotenv").config()
const express = require("express")
const cors = require("cors")

const port = process.env.PORT || 5001

const userRouter = require("./users/routes")
const dataRouter = require("./datum/routes")

const User = require("./users/model")
const Data = require("./datum/model")

const app = express()
app.use(cors())

app.use(express.json())

const syncTables = () => {
    User.hasOne(Data)
    Data.belongsTo(User)
    Data.sync({alter: true})
    User.sync()
}

app.use(userRouter)
app.use(dataRouter)

app.get("/health", (req, res) => {
    res.status(200).json({message: "api is working"})
})

app.listen(port, () => {
    syncTables()
    console.log(`server is running on port ${port}`)
})