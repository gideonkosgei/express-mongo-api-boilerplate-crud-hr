const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema
mongoose.promise = Promise

// Define userSchema
const users = new Schema(
	{
		firstname: { type: String },
		lastname: { type: String },
		date_of_birth: {type: Date}	,
		username: {type:String, required: true, unique:true},
		password : {type: String,required: true},
		email: {type: String},
		gender : {type: String, enum:["male","female"]},
		admin: {type:Boolean}
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


// Define schema methods
users.methods = {
	checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
users.pre('save', function (next) {
	if (!this.password) {
		console.log('NO PASSWORD PROVIDED')
		next()
	} else {
		console.log('hashPassword in pre save');		
		this.password = this.hashPassword(this.password)
		next()
	}
})


module.exports = mongoose.model('User', users)