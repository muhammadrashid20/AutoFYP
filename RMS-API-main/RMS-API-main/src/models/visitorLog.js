"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const visitorLogSchema = new Schema({
  _id: Schema["Types"].ObjectId,
  visitorName: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  cellNo: {
    type: String,
    required: true,
  },
  noOfgroupsAsked: {
    type: Number,
    required: true,
  },
  affordingCapacity: {
    type: Number,
    required: true,
  },
  edo: {
    type: String,
    required: true,
  },
  self: {
    type: String,
    required: true,
  },
});

const visitorLog = mongoose.model("VisitorLog", visitorLogSchema, "VisitorLogs");

exports.visitorLog = visitorLog;
