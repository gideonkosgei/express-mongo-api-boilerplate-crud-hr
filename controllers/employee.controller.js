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

    console.log(req.body.job.job_id);
    

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
            job_id: req.body.job_id,
            job_title: req.body.job_title,
            min_salary: req.body.min_salary,
            max_salary: req.body.max_salary
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



