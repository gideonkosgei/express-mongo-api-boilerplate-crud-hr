const User = require('../models/user.model.js');

// Create and Save a new user
exports.create = (req, res) => {

    // Validate request
    
    if(!req.body.firstname) {
        return res.status(400).json({
            message: "first Name can not be empty"
        });
    }

    if(!req.body.lastname) {
        return res.status(400).json({
            message: "Last Name can not be empty"
        });
    }
    
    
    // Create a user
    const user = new User({
        firstname: req.body.firstname, 
        lastname: req.body.lastname,
        date_of_birth:req.body.date_of_birth,
        username: req.body.username,
        password : req.body.password,
        email:req.body.email,
        gender : req.body.gender,
        admin: req.body.admin
    });

    // Save User in the database
    user.save()
    .then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};


// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.json(users);
    }).catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};


// Find a single user with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).json({
                message: "User not found with id " + req.params.userId
            });            
        }
        res.json(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).json({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};



// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.firstname) {
        return res.status(400).json({
            message: "firstname can not be empty"
        });
    }

    if(!req.body.lastname) {
        return res.status(400).json({
            message: "last name can not be empty"
        });
    }

    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.userId, {
        firstname: req.body.firstname ,
        lastname: req.body.lastname,
        date_of_birth:req.body.date_of_birth,        
        username: req.body.username,
        password : req.body.password,
        email:req.body.email,
        gender : req.body.gender,
        admin: req.body.admin
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).json({
                message: "User not found with id " + req.params.userId
            });
        }
        res.json(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).json({
            message: "Error updating User with id " + req.params.userId
        });
    });
};



// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).json({
                message: "User not found with id " + req.params.userId
            });
        }
        res.json({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).json({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).json({
            message: "Could not delete User with id " + req.params.userId
        });
    });
};



