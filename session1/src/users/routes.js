const { Router } = require("express")
const userRouter = Router()
const {registerUser, getAllUsers, updateUser, deleteUser, deleteAll, login, getCurrentUser} = require("./controllers")
const {hashPass, comparePass, tokenCheck} = require("../middleware")


userRouter.post("/users/register", hashPass, registerUser)
userRouter.get("/users/getallusers", tokenCheck, getAllUsers)
userRouter.get("/users/getcurrentuser", tokenCheck, getCurrentUser)
userRouter.put("/users/updateuser", updateUser)
userRouter.delete("/users/deleteuser", deleteUser)
userRouter.delete("/users/deleteall", deleteAll)
userRouter.post("/users/login", comparePass, login)
userRouter.get("/users/authcheck", tokenCheck, login)

module.exports = userRouter