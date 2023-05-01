const { Router } = require("express")
const dataRouter = Router()
const {additionalDetails, getDatum} = require("./controllers")
const {tokenCheck} = require("../middleware")

dataRouter.post("/datum/additionaldetails", additionalDetails)
dataRouter.get("/datum/getdatum", tokenCheck, getDatum)

module.exports = dataRouter