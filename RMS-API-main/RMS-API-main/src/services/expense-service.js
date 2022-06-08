"use strict";

const status = require("statuses");
const { Expense, Student, Admin } = require("../models");
const mongoose = require("mongoose");


const gettingExpenses = async (req, res) => {
    await adminIsAuthenticated(req, res);
    const data = await Expense.find({}).exec() ;
    return res.status(status("OK")).json({ 
        message: "Expenses Retrieved Successfully",
        data: data
    });
}

const postingExpenses = async (req, res) => {
    await adminIsAuthenticated(req, res);
    const {
        name, 
        category,
        amount,
    } = req.body ;

    await Expense.create({
        _id: mongoose.Types.ObjectId(),
        name: name,
        category: category,
        amount: amount,
    });

    return res.status(status("OK")).json({ message: "Expense Created Successfully"});
}

const deletingExpenses = async (req, res) => {
    await adminIsAuthenticated(req, res);
    var resp = await Expense.deleteMany({}).exec() ;
    return res.status(status("OK")).json({ message: "Expenses Deleted Successfully", status: resp});
}


const deleteExpense = async (req, res) => {
    await adminIsAuthenticated(req, res);
    const expenseId = req.params.expenseId ;
    const log = await Expense.findById(expenseId).exec() ;
    var resp = await Expense.deleteOne(log).exec() ;
    return res.status(status("OK")).json({ message: "Expense Deleted Successfully", status: resp});
}
const adminIsAuthenticated = async (req, res) => {
    const { isAuthorized, id} = req ;

    if (!isAuthorized) {
        return res.status(status("BAD REQUEST")).json({ message: "Admin is not authenticated" });
    }

    const admin = await Admin.findOne({ _id: id }).exec();
    const student = await Student.findOne({ _id: id }).exec();
    if (admin) {
        return admin ;
    }
    if (student) {
        return student ;
    }
    else {
        return res.status(status("BAD REQUEST")).json({ message: "Admin does not exist" });
    }
}

exports.gettingExpenses = gettingExpenses ;
exports.postingExpenses = postingExpenses ;
exports.deletingExpenses = deletingExpenses ;
exports.deleteExpense = deleteExpense ;


