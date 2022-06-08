"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const allotmentSchema = new Schema({
  _id: Schema["Types"].ObjectId,
  studentId: {
    type: Schema["Types"].ObjectId,
    ref: "Student",
  },
  groupId: {
    type: Schema["Types"].ObjectId,
    ref: "group",
  },
  securityDeposit: {
    type: Number,
    required: true,
  },
  registerationCharges: {
    type: Number,
    required: true,
  },
  monthlyRent: {
    type: Number,
    required: true,
  },
}, {
    timestamps: true,
});

const allotment = mongoose.model("Allotment", allotmentSchema, "Allotments");

exports.allotment = allotment;

// StudentID
// AllotmentNo
// groupId
// DateOfAllotment
// RentStartingdate
// SecurityDeposit(Refundable)
// RegistrationCharges (Non-Refundable)
// MonthlyRent