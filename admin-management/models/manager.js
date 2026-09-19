const mongoose = require("mongoose");

const managerSchema = new mongoose.Schema({
    name: String,
    email: String,
    salary: String,
    designation: String,
    status: Boolean,
    created_date: String,
    updated_date: String
});

module.exports = mongoose.model("Manager", managerSchema);