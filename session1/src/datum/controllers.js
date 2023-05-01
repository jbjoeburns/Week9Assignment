const Data = require("./model")

const additionalDetails = async(req, res) => {
	try {
		const details = await Data.create({
			realname: req.body.realname,
			address: req.body.address,
			UserId: req.body.UserId
		})
		res.status(201).json({
			message: "success",
			additionalDetails: {realname: req.body.realname, address: req.body.address, UserId: req.body.UserId}
		})
		console.log(details)
	}
	catch (error) {
		res.status(501).json({errorMessage: error.message, error: error})
	}
}

const getDatum = async (req, res) => {
	currentID = req.authUser.dataValues.id
	console.log(currentID)
	try {
		const datum = await Data.findOne({
			where: {UserId : currentID}
		});
		res.status(201).json({message:"success",datum:datum})
	
	}
	catch (error) {
		console.log(error)
	}
}

module.exports = {additionalDetails, getDatum}