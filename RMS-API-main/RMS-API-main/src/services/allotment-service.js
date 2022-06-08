"use strict";

const status = require("statuses");
const { Allotment, group, Admin, Student } = require("../models");
const mongoose = require("mongoose");


const gettingAllotments = async (req, res) => {
    await adminIsAuthenticated(req, res);
    const data = await Allotment.find({}).exec() ;
    return res.status(status("OK")).json({ 
        message: "Allotments Retrieved Successfully",
        data: data
    });
}

const postingAllotments = async (req, res) => {
    await adminIsAuthenticated(req, res);
    const {
        studentId, 
        groupId, 
        securityDeposit, 
        registerationCharges, 
        monthlyRent
    } = req.body ;

    var allotmentNew = await Allotment.create({
        _id: mongoose.Types.ObjectId(),
        studentId: studentId, 
        groupId: groupId, 
        securityDeposit: securityDeposit, 
        registerationCharges: registerationCharges, 
        monthlyRent: monthlyRent
    });

    var groupNew = await group.findById(groupId) ;
    groupNew.allotmentId = allotmentNew._id ;
    await groupNew.save();
    return res.status(status("OK")).json({ message: "Allotment Created Successfully"});
}

const deletingAllotments = async (req, res) => {
    await adminIsAuthenticated(req, res);
    var resp = await Allotment.deleteMany({}).exec() ;
    return res.status(status("OK")).json({ message: "Allotments Deleted Successfully", status: resp});
}


const deleteAllotment = async (req, res) => {
    await adminIsAuthenticated(req, res);
    const allotmentId = req.params.allotmentId ;
    const log = await Allotment.findById({_id: allotmentId}).exec() ;
    var groupOld = await group.find({allotmentId: log._id}).exec() ;
    var resp = await Allotment.deleteOne(log).exec() ;
    
    groupOld[0].allotmentId = undefined ;
    await groupOld[0].save() ;
    return res.status(status("OK")).json({ message: "Allotment Deleted Successfully", status: resp});
}

// For Admin Authentication
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

exports.gettingAllotments = gettingAllotments ;
exports.postingAllotments = postingAllotments ;
exports.deletingAllotments = deletingAllotments ;
exports.deleteAllotment = deleteAllotment ;


