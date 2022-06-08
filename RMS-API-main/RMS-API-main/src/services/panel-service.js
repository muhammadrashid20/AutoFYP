"use strict";

const status = require("statuses");
const { panel, Admin, Student } = require("../models");
const mongoose = require("mongoose");


const gettingpanels = async (req, res) => {
    await adminIsAuthenticated(req, res);
    const data = await panel.find({}).exec() ;
    return res.status(status("OK")).json({ 
        message: "panels Retrieved Successfully",
        data: data
    });
}

const postingpanels = async (req, res) => {
    await adminIsAuthenticated(req, res);
    const {
        name, 
    } = req.body ;

    await panel.create({
        _id: mongoose.Types.ObjectId(),
        name: name,
    });

    return res.status(status("OK")).json({ message: "panel Created Successfully"});
}

const deletingpanels = async (req, res) => {
    await adminIsAuthenticated(req, res);
    var resp = await panel.deleteMany({}).exec() ;
    return res.status(status("OK")).json({ message: "panels Deleted Successfully", status: resp});
}


const deletepanel = async (req, res) => {
    await adminIsAuthenticated(req, res);
    const panelId = req.params.panelId ;
    const log = await panel.findById(panelId).exec() ;
    var resp = await panel.deleteOne(log).exec() ;
    return res.status(status("OK")).json({ message: "panel Deleted Successfully", status: resp});
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

exports.gettingpanels = gettingpanels ;
exports.postingpanels = postingpanels ;
exports.deletingpanels = deletingpanels ;
exports.deletepanel = deletepanel ;


