"use strict";

const status = require("statuses");
const { Ideas, Admin, Student } = require("../models");
const mongoose = require("mongoose");


const gettingIdeas = async (req, res) => {
    await adminIsAuthenticated(req, res);
    const data = await Ideas.find({}).exec() ;
    return res.status(status("OK")).json({ 
        message: "Ideas Retrieved Successfully",
        data: data
    });
}

const postingIdeas = async (req, res) => {
    try {
        await adminIsAuthenticated(req, res);
        const {
            GivenBY,
            // Title,
            details,
            // Type,
            Tooluse,
            knowledge,
        } = req.body ;
        
        const ide = await Ideas.create({
            _id: mongoose.Types.ObjectId(),
            GivenBY: GivenBY,
            // Title: Title,
            details: details,
            // Type: Type,
            Tooluse: Tooluse,
            knowledge:knowledge
        });
        console.log(ide) ;
        return res.status(status("OK")).json({ message: "Ideas Created Successfully"});
    } catch(error) {
    console.error(error);
    // throw new Error('Failed');
    }
}

const deletingIdeas = async (req, res) => {
    await adminIsAuthenticated(req, res);
    var resp = await Ideas.deleteMany({}).exec() ;
    return res.status(status("OK")).json({ message: "Ideas Deleted Successfully", status: resp});
}

const deleteIdeas = async (req, res) => {
    await adminIsAuthenticated(req, res);
    const logId = req.params.logId ;
    const log = await Ideas.findById(logId).exec() ;
    var resp = await Ideas.deleteOne(log).exec() ;
    return res.status(status("OK")).json({ message: "Ideas Deleted Successfully", status: resp});
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

exports.gettingIdeas = gettingIdeas ;
exports.postingIdeas = postingIdeas ;
exports.deletingIdeas = deletingIdeas ;
exports.deleteIdeas = deleteIdeas ;
