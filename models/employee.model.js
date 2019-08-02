const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise

const contact_schema = new Schema(
    {
        contact_type : { type: String },
        contact_number : { type: String }
    }  
);

const CountyArray = ["Nairobi", "Mombasa", "Nakuru", "Laikipia", "UASIN GISHU", "Elgeiyo Marakwet", "Nandi", "Kericho", "Machakos", "Kiambu", "Meru", "Tana River", "Narok", 
"Kajiado", "Makueni", "Kitui", "Mandera", "lamu"];

// Define  Employees Schema
const employees = new Schema(
	{  
        employee_number: { type: Number },      
		first_name: { type: String },
        last_name: { type: String },       
        email: { type: String },
        contacts: [contact_schema],      
        hire_date: { type: Date },
        salary: { type: Number } ,
        commission_pct: { type: Number },
        job: {
            job_id : { type: Number },
            job_title : { type: String },
            min_salary : { type: Number },
            max_salary : { type: Number }
        } ,
        address : {
            street: { type: String },
            city: { type: String },
            county: {
                type: String,
                uppercase: true,
                required: true,
                enum: CountyArray
            },
            code: { type: String },
        }
         
	},
	{
		timestamps: true
	}
)
module.exports = mongoose.model('Employees', employees)