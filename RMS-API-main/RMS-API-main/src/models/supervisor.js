"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const supervisorSchema = new Schema({
  _id: Schema["Types"].ObjectId,
  name: {
    type: String,
    required: true,
  },
  totalgroups: {
    type: Number,
    default: 0,
  },
  groups: {
    type: [Schema["Types"].ObjectId],
    ref: "group",
  },
}, {
    timestamps: true,
});

const supervisor = mongoose.model("supervisor", supervisorSchema, "supervisors");

exports.supervisor = supervisor;

// supervisorId
// supervisorName
// Total groups
// groups