const User = require("./model")
const Data = require('../datum/model')
const jwt = require("jsonwebtoken")

const registerUser = async(req, res) => {
	try {
		console.log("next called")
		const user = await User.create({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password
			// can also do: 
			// const user = await User.create(req.body)
		})
		res.status(201).json({
			message: "success",
			user: {username: req.body.username, email: req.body.email, password: req.body.password}
		})
	}
	catch (error) {
		res.status(501).json({errorMessage: error.message, error: error})
	}
}

const getAllUsers = async (req, res) => {
	try {
		const users = await User.findAll({
			include: Data,
		});
		res.status(201).json({message:"success",users:users})
	
	}
	catch (error) {
		console.log(error)
	}
}

const getCurrentUser = async (req, res) => {
	currentID = req.authUser.dataValues.id
	try {
		const users = await User.findOne({
			where: {id : currentID},
			include: Data,
		});
		res.status(201).json({message:"success",users:users})
	
	}
	catch (error) {
		console.log(error)
	}
}

const updateUser = async (req, res) => {
	try {
		const updateUser = await User.update({
			username: req.body.newUsername,
			password: req.body.newPassword,
			email: req.body.newEmail
		},
		{ where: {
			username: req.body.username
		}
		})
		res.status(201).json({message:"success",updateResult:updateUser})
	}
	catch (error) {
		console.log(error)
	}
}

const deleteUser = async (req, res) => {
	try{
		const users = await User.destroy({
			where: {
				username: req.body.username,
			}
		})
		res.status(201).json({message:"success",users:users})
	} catch (error) {
		console.log(error)
	}
}

const deleteAll = async (req, res) => {
	try{
		const users = await User.destroy({ truncate : true })
		res.status(201).json({message:"success",users:users})
	} catch (error) {
		console.log(error)
	}
}

const login = async (req, res) => {
	try{
		if (req.authUser) {
			res.status(200).json({
				message: "success",
				user: {
					username: req.authUser.username,
					email: req.authUser.email,
				}, 
			})
		}
		const token = await jwt.sign({id: req.user.id}, process.env.SECRET)
		res.status(200).json({
			message:"success",
			user: {
			username: req.user.username,
			email: req.user.email,
			token: token
			}, 
		})
	} catch (error) {
		console.log(error)
	}
}



module.exports = {registerUser, getAllUsers, updateUser, deleteUser, deleteAll, login, getCurrentUser}