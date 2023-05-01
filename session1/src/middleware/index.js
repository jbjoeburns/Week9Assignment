const User = require("../users/model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const hashPass = async (req, res, next) => {
    try{
        req.body.password = await bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUNDS))
        console.log("inside middleware hashpass")
        next()
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error})
    }
}

const comparePass = async (req, res, next) => {
    try {
        req.user = await User.findOne({
			where: {
				username: req.body.username
			}
		});
        if (req.user == null) {
            console.log("username not in db")
            throw new Error ("Password or username is incorrect.")
        }
        const match = await bcrypt.compare(req.body.password, req.user.password);
        if(match) {
            console.log("Password accepted")
        }
        else {
            throw new Error ("Password or username is incorrect.")
        }

        // res.status(201).json({message:"success",user:req.user.username})
        //find user in database using username
        // req.user = await User ....
        // find password associated with user
        //compare with plain text password using .compare method
        // if no match or user doesnt exist,  then handle error
        next()
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error})
    }
}

const tokenCheck = async (req, res, next) => {
    try {
        if (!req.header("Authorization")) {
            throw new Error ("No header or token passed in the request...")
        }
        console.log(req.header("Authorization"))
        const token = req.header("Authorization").replace("Bearer ", "")
        // console.log(token)
        const decodedToken = await jwt.verify(token, process.env.SECRET)
        // console.log(decodedToken)
        if (!decodedToken) {
            console.log("not decoded token")
            throw new Error("User not authorised")
        }
        const user = await User.findOne({where: {id: decodedToken.id}}) 
        // console.log(decodedToken.id)
        if(!user){
            throw new Error("User not authorised")
        }
        req.authUser = user
        // console.log(req.authUser)
        next()
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error})
    }
}

module.exports = {hashPass, comparePass, tokenCheck}