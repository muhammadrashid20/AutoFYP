"use strict";

const status = require("statuses");
const { Annoucement, Admin, Student } = require("../models");
const mongoose = require("mongoose");


const gettingAnnoucements = async (req, res) => {
    await adminIsAuthenticated(req, res);
    const data = await Annoucement.find({}).exec() ;
    return res.status(status("OK")).json({ 
        message: "Annoucements Retrieved Successfully",
        data: data
    });
}

const postingAnnoucements = async (req, res) => {
    console.log(req.body)
    try {
        await adminIsAuthenticated(req, res);
        const {
            AnnoucementFor,
            Title,
            details
        } = req.body ;
        await Annoucement.create({
            _id: mongoose.Types.ObjectId(),
            AnnoucementFor: AnnoucementFor,
            Title: Title,
            details:details
        })
        return res.status(status("OK")).json({ message: "Annoucement Created Successfully"});
    } catch {
        // console.error(error);
        throw new Error('Failed');
    }
} 

const deletingAnnoucements = async (req, res) => {
    await adminIsAuthenticated(req, res);
    var resp = await Annoucement.deleteMany({}).exec() ;
    return res.status(status("OK")).json({ message: "Annoucement Deleted Successfully", status: resp});
}


const deleteAnnoucements = async (req, res) => {
    await adminIsAuthenticated(req, res);
    const logId = req.params.logId ;
    const log = await Annoucement.findById(logId).exec() ;
    var resp = await Annoucement.deleteOne(log).exec() ;
    return res.status(status("OK")).json({ message: "Annoucement Deleted Successfully", status: resp});
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

exports.gettingAnnoucements = gettingAnnoucements ;
exports.postingAnnoucements = postingAnnoucements ;
exports.deletingAnnoucements = deletingAnnoucements ;
exports.deleteAnnoucements = deleteAnnoucements ;


