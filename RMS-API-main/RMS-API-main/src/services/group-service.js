"use strict";

const status = require("statuses");
const { group, supervisor, Student, Admin } = require("../models");
const mongoose = require("mongoose");


const gettinggroups = async (req, res) => {
    await adminIsAuthenticated(req, res);
    const data = await group.find({}).exec() ;
    return res.status(status("OK")).json({ 
        message: "groups Retrieved Successfully",
        data: data
    });
}

const postinggroups = async (req, res) => {
    await adminIsAuthenticated(req, res);
    const {
        //allotmentId, 
        cupboard,
        sideTable,
        supervisorId,
        name
    } = req.body ;

    var groupNew = await group.create({
        _id: mongoose.Types.ObjectId(),
        //allotmentId: allotmentId, 
        cupboard: cupboard,
        sideTable: sideTable,
        name: name,
    });

    var groupNewId = groupNew._id ;
    var supervisorNew = await supervisor.findById(supervisorId) ;
    supervisorNew.groups.push(groupNewId);
    supervisorNew.totalgroups = supervisorNew.totalgroups + 1 ;
    await supervisorNew.save();

    return res.status(status("OK")).json({ message: "group Created Successfully"});
}

const deletinggroups = async (req, res) => {
    await adminIsAuthenticated(req, res);
    var resp = await group.deleteMany({}).exec() ;
    return res.status(status("OK")).json({ message: "groups Deleted Successfully", status: resp});
}


const deletegroup = async (req, res) => {
    await adminIsAuthenticated(req, res);
    const groupId = req.params.groupId ;
    const log = await group.findById(groupId).exec() ;
    var resp = await group.deleteOne(log).exec() ;

    let supervisors = await supervisor.find({}).exec() ;
    for (var i = 0 ; i < supervisors.length ; i++) {
        for (var j = 0 ; j < supervisors[i].groups.length ; j++) {
            console.log("supervisors", supervisors[i].groups[j], groupId);
            if (supervisors[i].groups[j] == groupId) {
                console.log("TRUE");
                let thesupervisor = await supervisor.findById(supervisors[i]._id) ;
                thesupervisor.totalgroups = supervisors[i].totalgroups - 1 ;
                thesupervisor.groups.splice(j, 1);
                await thesupervisor.save();
                break ;
            }
        }
    }

    return res.status(status("OK")).json({ message: "group Deleted Successfully", status: resp});
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

exports.gettinggroups = gettinggroups ;
exports.postinggroups = postinggroups ;
exports.deletinggroups = deletinggroups ;
exports.deletegroup = deletegroup ;


