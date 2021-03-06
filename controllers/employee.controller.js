const Employee = require('../models/employee.model.js');

// Create and Save a new Employee
exports.create = (req, res) => {
    // Validate request
    
    if(!req.body.first_name) {
        return res.status(400).json({
            message: "first Name can not be empty"
        });
    }

    if(!req.body.last_name) {
        return res.status(400).json({
            message: "Last Name can not be empty"
        });
    }

    // Create a Employee

    const employee = new Employee({
        employee_number: req.body.employee_number,
        first_name: req.body.first_name, 
        last_name: req.body.last_name,
        email :  req.body.email,
        phone_number: req.body.phone_number,
        hire_date: req.body.hire_date,
        salary: req.body.salary, 
        commission_pct: req.body.commission_pct,
        job:{
            job_id: req.body.job.job_id,
            job_title: req.body.job.job_title,
            min_salary: req.body.job.min_salary,
            max_salary: req.body.job.max_salary
        },
        address:{
            street: req.body.address.street,
            city: req.body.address.city,
            county: req.body.address.county,
            code: req.body.address.code
        }
    });

    // Save Employee in the database
    employee.save()
    .then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while creating New Employee."
        });
    });
};

// Retrieve and return all Employees from the database.
exports.findAll = (req, res) => {
    Employee.find()
    .then(employees => {
        res.json(employees);
    }).catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving Employees."
        });
    });
};


// Find a single Employees with a employeeId
exports.findOne = (req, res) => {
    Employee.findById(req.params.employeeId)
    .then(employee => {
        if(!employee) {
            return res.status(404).json({
                message: "Employee not found with id " + req.params.employeeId
            });            
        }
        res.json(employee);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                message: "Employee not found with id " + req.params.employeeId
            });                
        }
        return res.status(500).json({
            message: "Error retrieving Employee with id " + req.params.employeeId
        });
    });
};

// Update an Employee identified by the employeeId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.first_name) {
        return res.status(400).json({
            message: "firstname can not be empty"
        });
    }

    if(!req.body.last_name) {
        return res.status(400).json({
            message: "last name can not be empty"
        });
    }
  
    // Find Employee and update it with the request body
    Employee.findByIdAndUpdate(req.params.employeeId, {        
        employee_number: req.body.employee_number,
        first_name: req.body.first_name, 
        last_name: req.body.last_name,
        email :  req.body.email,
        phone_number: req.body.phone_number,
        hire_date: req.body.hire_date,
        salary: req.body.salary, 
        commission_pct: req.body.commission_pct,
        job:{
            job_id: req.body.job.job_id,
            job_title: req.body.job.job_title,
            min_salary: req.body.job.min_salary,
            max_salary: req.body.job.max_salary
        },
        address:{
            street: req.body.address.street,
            city: req.body.address.city,
            county: req.body.address.county,
            code: req.body.address.code
        }
    }, {new: true})
    .then(employee => {
        if(!employee) {
            return res.status(404).json({
                message: "Employee not found with id " + req.params.employeeId
            });
        }
        res.json(employee);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                message: "Employee not found with id " + req.params.employeeId
            });                
        }
        return res.status(500).json({
            message: "Error updating Employee with id " + req.params.employeeId
        });
    });
};

// Delete an Employee with the specified employeeId in the request
exports.delete = (req, res) => {
    Employee.findByIdAndRemove(req.params.employeeId)
    .then(employee => {
        if(!employee) {
            return res.status(404).json({
                message: "Employee not found with id " + req.params.employeeId
            });
        }
        res.json({message: "Employee deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).json({
                message: "Employee not found with id " + req.params.employeeId
            });                
        }
        return res.status(500).json({
            message: "Could not delete Employee with id " + req.params.employeeId
        });
    });
};

// Update an Employee identified by the employeeId in the request with new contact Details
exports.AddContactDetails = (req, res) => {
    // Validate Request
    Employee.findByIdAndUpdate(req.params.employeeId, 
          { $push: {contacts: {
                contact_type: req.body.contact_type,
                contact_number: req.body.contact_number
          } } 
        }
    , {new: true})
    .then(employee => {
        if(!employee) {
            return res.status(404).json({
                message: "Employee not found with id " + req.params.employeeId
            });
        }
        res.json(employee);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                message: "Employee not found with id " + req.params.employeeId
            });                
        }
        return res.status(500).json({
            message: "Error Adding Contact Details " + req.params.employeeId
        });
    });

}

// Remove a specified Contact Details from A specific Employee
exports.RemoveContactDetailsFromEmployee = (req, res) => {
    // Find Employee and Contact and Remove Contact
    //  1. Check if the Employee Exists. If Yes go to 2 else exit
    //  2. Check if the Contact exists. If yes Delete contact else exit

    
    // check if employee ID is passed parameter
    if(!req.params.employeeId) {
        return res.status(400).json({
            message: "Employee ID can not be empty"
        });
    }

    // check if contact ID is passed as parameter
    if(!req.params.contactId) {
        return res.status(400).json({
            message: "Contact ID can not be empty"
        });
    }

    
  
    Employee.findByIdAndUpdate({_id: req.params.employeeId}, {    
        $pull: {
            contacts: {
                _id: req.params.contactId
            }
        }          
    }, {new: true})
    .then(employee => {       
        if(!employee) {
            return res.status(404).json({
                message: "Employee not found with id " + req.params.employeeId
            });
        }
        res.json(employee);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                message: "Employee not found with id " + req.params.employeeId
            });                
        }
        return res.status(500).json({
            message: "Error updating Employee with id " + req.params.employeeId
        });
    });
};

