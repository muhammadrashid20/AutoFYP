"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const StudentSchema = new Schema({
  _id: Schema["Types"].ObjectId,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: false,
  }
}, 
{
    timestamps: true,
});

const Student = mongoose.model("Student", StudentSchema, "Students");

exports.Student = Student;


// StudentID
// StudentName
// FatherName
// Address-Street Address
// City
// State
// Country
// CellNo
// emailID
// FatherCellNo
// Occupation
// GuardianName
// GuardianRelation
// GuardianCellNo
// BloodGroup