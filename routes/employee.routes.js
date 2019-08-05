
module.exports = (app) => {
    const employees = require('../controllers/employee.controller.js');

    // Create a new Employee
    app.post('/employees', employees.create);

    // Retrieve all Employees
    app.get('/employees', employees.findAll);    

    // Retrieve a single Employee with employeeId
    app.get('/employees/:employeeId', employees.findOne);

    // Update an Employee with employeeId
    app.put('/employees/:employeeId', employees.update);

    // Delete an Employee with employeeId
    app.delete('/employees/:employeeId', employees.delete);

     // Add Employee Contact details
     app.put('/employees/:employeeId/contacts', employees.AddContactDetails);
     
     // Update Employee Contact details
     //app.put('/employees/:employeeId/contacts/:contactId/update', employees.UpdateContactDetails);
     // Remove specified Contact Detail from specified Employee
     app.put('/employees/:employeeId/contacts/:contactId/remove', employees.RemoveContactDetailsFromEmployee);
   
}