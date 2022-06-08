"use strict";

const status = require("statuses");
const { supervisor, panel, Admin, Student } = require("../models");
const mongoose = require("mongoose");


const gettingsupervisors = async (req, res) => {
    await adminIsAuthenticated(req, res);
    const data = await supervisor.find({}).exec() ;
    return res.status(status("OK")).json({ 
        message: "supervisors Retrieved Successfully",
        data: data
    });
}

const postingsupervisors = async (req, res) => {
    await adminIsAuthenticated(req, res);
    const {
        name, 
        panelId,
    } = req.body ;

    var supervisorNew = await supervisor.create({
        _id: mongoose.Types.ObjectId(),
        name: name,
    });

    var supervisorNewId = supervisorNew._id ;
    var panelNew = await panel.findById(panelId) ;
    panelNew.supervisors.push(supervisorNewId);
    panelNew.totalsupervisors = panelNew.totalsupervisors + 1 ;
    await panelNew.save() ;

    return res.status(status("OK")).json({ message: "supervisor Created Successfully"});
}

const deletingsupervisors = async (req, res) => {
    await adminIsAuthenticated(req, res);
    var resp = await supervisor.deleteMany({}).exec() ;
    return res.status(status("OK")).json({ message: "supervisors Deleted Successfully", status: resp});
}


const deletesupervisor = async (req, res) => {
    await adminIsAuthenticated(req, res);
    const supervisorId = req.params.supervisorId ;
    const log = await supervisor.findById(supervisorId).exec() ;
    var resp = await supervisor.deleteOne(log).exec() ;
    
    let panels = await panel.find({}).exec() ;
    for (var i = 0 ; i < panels.length ; i++) {
        for (var j = 0 ; j < panels[i].supervisors.length ; j++) {
            console.log("supervisors", panels[i].supervisors[j], supervisorId);
            if (panels[i].supervisors[j] == supervisorId) {
                console.log("TRUE");
                let thepanel = await panel.findById(panels[i]._id) ;
                thepanel.totalsupervisors = panels[i].totalsupervisors - 1 ;
                thepanel.supervisors.splice(j, 1);
                await thepanel.save();
                break ;
            }
        }
    }
    return res.status(status("OK")).json({ message: "supervisor Deleted Successfully", status: resp});
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


exports.gettingsupervisors = gettingsupervisors ;
exports.postingsupervisors = postingsupervisors ;
exports.deletingsupervisors = deletingsupervisors ;
exports.deletesupervisor = deletesupervisor ;


