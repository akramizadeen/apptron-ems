const mongoose = require('mongoose');

const Schema = mongoose.Schema

const departmentSchema = Schema({
    departmentName: { type: String, required: true },
    departmentCode: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Department', departmentSchema);
