"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const panelSchema = new Schema({
  _id: Schema["Types"].ObjectId,
  name: {
    type: String,
    required: true,
  },
  totalsupervisors: {
    type: Number,
    default: 0,
  },
  supervisors: {
    type: [Schema["Types"].ObjectId],
    ref: "supervisor",
  },
}, {
    timestamps: true,
});
1
const panel = mongoose.model("panel", panelSchema, "panels");

exports.panel = panel;

// FllorID
// panelName
// supervisor
// Totalsupervisors