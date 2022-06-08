"use strict";

const status = require("statuses");
const { VisitorLog, Admin, Student } = require("../models");
const mongoose = require("mongoose");


const gettingVisitorLogs = async (req, res) => {
    await adminIsAuthenticated(req, res);
    const data = await VisitorLog.find({}).exec() ;
    return res.status(status("OK")).json({ 
        message: "Visitor Logs Retrieved Successfully",
        data: data
    });
}

const postingVisitorLogs = async (req, res) => {
    await adminIsAuthenticated(req, res);
    const {
        visitorName, 
        occupation, 
        organization, 
        cellNo, 
        noOfgroupsAsked, 
        affordingCapacity,
        edo, 
        self
    } = req.body ;

    await VisitorLog.create({
        _id: mongoose.Types.ObjectId(),
        visitorName: visitorName,
        occupation: occupation,
        organization: organization,
        cellNo: cellNo,
        noOfgroupsAsked: noOfgroupsAsked,
        affordingCapacity: affordingCapacity,
        edo: edo,
        self: self,
    })
    return res.status(status("OK")).json({ message: "Visitor Log Created Successfully"});
}

const deletingVisitorLogs = async (req, res) => {
    await adminIsAuthenticated(req, res);
    var resp = await VisitorLog.deleteMany({}).exec() ;
    return res.status(status("OK")).json({ message: "Visitor Logs Deleted Successfully", status: resp});
}


const deleteVisitorLog = async (req, res) => {
    await adminIsAuthenticated(req, res);
    const logId = req.params.logId ;
    const log = await VisitorLog.findById(logId).exec() ;
    var resp = await VisitorLog.deleteOne(log).exec() ;
    return res.status(status("OK")).json({ message: "Visitor Log Deleted Successfully", status: resp});
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

exports.gettingVisitorLogs = gettingVisitorLogs ;
exports.postingVisitorLogs = postingVisitorLogs ;
exports.deletingVisitorLogs = deletingVisitorLogs ;
exports.deleteVisitorLog = deleteVisitorLog ;


