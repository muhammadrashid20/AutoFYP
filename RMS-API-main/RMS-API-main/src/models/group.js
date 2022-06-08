"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const groupSchema = new Schema({
  _id: Schema["Types"].ObjectId,
  allotmentId: {
    type: Schema["Types"].ObjectId,
    // ref: "Allotment",
    ref: "supervisors",
  },
  cupboard: {
    type: Boolean,
    required: true,
  },
  sideTable: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    required: true,
  }

  // GroupName: {
  //   type: String,
  //   required: true,
  // },
  // Supervisor: {
  //   type: String,
  //   required: true,
  // },
  // Student1: {
  //   type: String,
  //   required: true,
  // },
  // Student2: {
  //   type: String,
  //   required: true,
  // },
  // Student3: {
  //   type: String,
  //   required: true,
  // }
}, {
    timestamps: true,
});

const group = mongoose.model("group", groupSchema, "groups");

exports.group = group;

// groupID
// AllotmentNo
// Cupboard
// Side Table