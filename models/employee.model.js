const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise

// Define  Employees Schema
const employees = new Schema(
	{  
        employee_number: { type: Number },      
		first_name: { type: String },
        last_name: { type: String },       
        email: { type: String },
        phone_number: { type: String },
        hire_date: { type: Date },
        salary: { type: Number } ,
        commission_pct: { type: Number }      
	},
	{
		timestamps: true
	}
)
module.exports = mongoose.model('Employees', employees)