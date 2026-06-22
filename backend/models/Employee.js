const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = Schema({
    fullName: { type: String, required: true },
    emial: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    department: { type: String, required: true },
    position: { type: String, required: true },
    salary: { type: Number, required: true },
    dateOfJoining: { type: Date, required: true },
    address: { type: String, required: true },
    profileImg: { type: String, required: true },
    status: { type: String, required: true, default: "Active" },
}, { timestampes: true });

module.exports = mongoose.model('Employee', employeeSchema);
