"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const rentReceiptSchema = new Schema({
  _id: Schema["Types"].ObjectId,
  StudentId: {
    type: Schema["Types"].ObjectId,
    ref: "Student",
  },
  rentMonth: {
      type: String,
      required: true,
  },
  natureOfPayment: {
      type: String,
      required: true,
  },
  amount: {
      type: Number,
      required: true,
  },
  modeOfPayment: {
      type: String,
      required: true,
  },
  receivingPerson: {
      type: String,
      required: true,
  },
}, {
    timestamps: true,
});

const rentReceipt = mongoose.model("RentReceipt", rentReceiptSchema, "rentReceipts");

exports.rentReceipt = rentReceipt;

// InvoiceNo
// Date
// AlotteeID
// RentMonth
// NatureofPayment
// Amount (Rs.)
// OtherPayment
// Amount (Rs.)
// ModeOfPayment
// ReceivingPerson