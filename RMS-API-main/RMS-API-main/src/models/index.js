"use strict";

const {visitorLog} = require("./visitorLog");
const {Student} = require("./Student") ;
const {allotment} = require("./allotment") ;
const {group} = require("./group") ;
const {supervisor} = require("./supervisor") ;
const {panel} = require("./panel") ;
const {rentReceipt} = require("./rentReceipts") ;
const { expense } = require("./expense") ;
const {Admin} = require("./admin") ;
const {Annoucement} = require("./annoucement") ;
const {Ideas} = require("./ideas") ;

exports.VisitorLog = visitorLog;
exports.Student = Student;
exports.Allotment = allotment;
exports.group = group;
exports.supervisor = supervisor;
exports.panel = panel;
exports.RentReceipts = rentReceipt;
exports.Expense = expense;
exports.Admin = Admin ;
exports.Annoucement = Annoucement ;
exports.Ideas = Ideas ;