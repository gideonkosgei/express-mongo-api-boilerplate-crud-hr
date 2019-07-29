const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise

// Define userSchema
const users = new Schema(
	{
		firstname: { type: String },
		lastname: { type: String }	
	},
	{
		timestamps: true
	}
)
module.exports = mongoose.model('User', users)