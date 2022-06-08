"use strict";

const status = require("statuses");
const { RentReceipts, Admin, Student } = require("../models");
const mongoose = require("mongoose");


const gettingRentReceipts = async (req, res) => {
    await adminIsAuthenticated(req, res);
    const data = await RentReceipts.find({}).exec() ;
    return res.status(status("OK")).json({ 
        message: "RentReceipts Retrieved Successfully",
        data: data
    });
}

const postingRentReceipts = async (req, res) => {
    await adminIsAuthenticated(req, res);
    const {
        StudentId,
        rentMonth,
        natureOfPayment,
        amount,
        modeOfPayment,
        receivingPerson
    } = req.body ;

    await RentReceipts.create({
        _id: mongoose.Types.ObjectId(),
        StudentId: StudentId,
        rentMonth: rentMonth,
        natureOfPayment: natureOfPayment,
        amount: amount,
        modeOfPayment: modeOfPayment,
        receivingPerson: receivingPerson
    });

    return res.status(status("OK")).json({ message: "RentReceipt Created Successfully"});
}

const deletingRentReceipts = async (req, res) => {
    await adminIsAuthenticated(req, res);
    var resp = await RentReceipts.deleteMany({}).exec() ;
    return res.status(status("OK")).json({ message: "RentReceipts Deleted Successfully", status: resp});
}


const deleteRentReceipt = async (req, res) => {
    await adminIsAuthenticated(req, res);
    const rentReceiptsId = req.params.rentReceiptsId ;
    const log = await RentReceipts.findById({_id: rentReceiptsId}).exec() ;
    var resp = await RentReceipts.deleteOne(log).exec() ;
    return res.status(status("OK")).json({ message: "RentReceipt Deleted Successfully", status: resp});
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

exports.gettingRentReceipts = gettingRentReceipts ;
exports.postingRentReceipts = postingRentReceipts ;
exports.deletingRentReceipts = deletingRentReceipts ;
exports.deleteRentReceipt = deleteRentReceipt ;


