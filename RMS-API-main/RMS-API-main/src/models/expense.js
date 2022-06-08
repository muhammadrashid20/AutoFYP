"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const expenseSchema = new Schema({
  _id: Schema["Types"].ObjectId,
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  }
}, {
    timestamps: true,
});

const expense = mongoose.model("Expense", expenseSchema, "expenses");

exports.expense = expense;

// groupID
// AllotmentNo
// Cupboard
// Side Table