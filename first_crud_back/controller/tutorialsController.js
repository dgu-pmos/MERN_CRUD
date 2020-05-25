const Tutorial = require("../models/Tutorial");

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // empty content
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // making Schema
    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    });
    // save data
    tutorial.save(tutorial)
    .then(data => {
        res.send(data);
    })
    // error catch
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Tutorial."
        });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    // finding all data
    Tutorial.find({})
    .then(data => {
        res.send(data);
    })
    // error catch
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while searching the Tutorial."
        })
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    // id contains with params
    const id = req.params.id;
    // finding data using by id
    Tutorial.findById(id)
    .then(data => {
        if (!data)
            res.status(404).send({ message: "Not found Tutorial with id " + id });
        else 
            res.send(data);
    })
    // error catch
    .catch(err => {
        res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    // empty body catch
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    };
    // id contains with params
    const id = req.params.id;
    // find by ID and update data
    Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data) {
            res.status(404).send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
            });
        } else 
            res.send({ message: "Tutorial was updated successfully." });
    })
    // error catch
    .catch(err => {
        res.status(500).send({
            message: "Error updating Tutorial with id=" + id
        });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    // find by ID and remove it
    Tutorial.findByIdAndRemove(id)
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
            });
        } else {
            res.send({
                message: "Tutorial was deleted successfully!"
            });
        }
    })
    // error catch
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Tutorial with id=" + id
        });
    });
};

// delete all data from database
exports.deleteAll = (req, res) => {
    Tutorial.deleteMany({})
    .then(data => {
        res.send({
            message: `${data.deletedCount} Tutorials were deleted successfully!`
        });
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all tutorials."
        });
    });
};

// find all data by conditions
exports.findAllPublished = (req, res) => {
    Tutorial.find({ published: true })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving tutorials."
        });
    });
};