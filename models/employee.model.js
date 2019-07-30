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
        commission_pct: { type: Number },
        job: {
            job_id : { type: Number },
            job_title : { type: String },
            min_salary : { type: Number },
            max_salary : { type: Number }
        }     
	},
	{
		timestamps: true
	}
)
module.exports = mongoose.model('Employees', employees)