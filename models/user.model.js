const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise

// Define userSchema
const users = new Schema(
	{
		firstname: { type: String },
		lastname: { type: String },
		date_of_birth: {type: Date}	
	},
	{
		timestamps: true,
		toObject: {
			virtuals: false
			},
		toJSON: {
			virtuals: false 
			}
	}
	
);


// Virtual for user's full name
users
.virtual('name')
.get(function () {
  return this.firstname + ' ' + this.lastname;
});


module.exports = mongoose.model('User', users)