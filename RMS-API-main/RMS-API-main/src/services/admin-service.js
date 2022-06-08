"use strict";

const status = require("statuses") ;
const { VisitorLog, Student, Allotment, group, supervisor, panel, RentReceipts, Expense, Admin } = require("../models") ;
const config = require("../config") ;
const mongoose = require("mongoose") ;
const jsonwebtoken = require("jsonwebtoken") ;
const { hash, compare } = require("bcryptjs") ;

//ADMIN
// Register
const register = async (req, res) => {
    console.log("I'm Awake") ;
    const { email, password, name } = req.body;

    if (!email) {
        return res.status(status("BAD REQUEST")).json({ message: "Email Not Provided" });
    }

    if (!password) {
        return res.status(status("BAD REQUEST")).json({ message: "Password Not Provided" });
    }
    if (!name) {
        return res.status(status("BAD REQUEST")).json({ message: "Name Not Provided" });
    }

    const userAlreadyRegistered = await Admin.findOne({ email: email }).exec();

    if (userAlreadyRegistered) {
        return res.status(status("OK")).json({ message: "Admin already exists" });
    }

    await Admin.create({
        _id: mongoose.Types.ObjectId(),
        email: email,
        password: await hash(password, 12),
        name: name,
    });

    return res.status(status("CREATED")).json({ message: "Admin registered successfully" });
};

  //Login 
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(status("BAD REQUEST")).json({ message: "Email Not Provided" });
    }

    if (!password) {
        return res.status(status("BAD REQUEST")).json({ message: "Password Not Provided" });
    }

    const admin = await Admin.findOne({ email: email }).exec();

    if (!admin) {
        return res.status(status("OK")).json({ message: "Admin does not exist" });
    }

    const isPasswordValid = await compare(password, admin.password);

    if (!isPasswordValid) {
        return res.status(status("OK")).json({ message: "Invalid Credentials" });
    }

    const token = jsonwebtoken.sign({ id: admin._id }, config.privateKeys.jwtPrivateKey, {
        expiresIn: "1h",
    });

    res.cookie("HMS_TOKEN", token, {
        maxAge: 3600000,
        httpOnly: true,  
        signed: true,
        sameSite: "none",
        secure: true,
    });
    return res.status(status("OK")).json({ message: "Admin logged in successfully", token: token });
};

// Get All Admins
const getAllAdmins = async (req, res) => {
    await adminIsAuthenticated(req, res) ;

    const data = await Admin.find({}).exec() ;
    
    return res.status(status("OK")).json({ message: "Admin retrieved successfully", data: data });
}

// For Admin Authentication
const adminIsAuthenticated = async (req, res) => {
    const { isAuthorized, id} = req ;

    if (!isAuthorized) {
        return res.status(status("BAD REQUEST")).json({ message: "Admin is not authenticated" });
    }

    const admin = await Admin.findOne({ _id: id }).exec();

    if (!admin) {
        return res.status(status("BAD REQUEST")).json({ message: "Admin does not exist" });
    }

    return admin;
}

const getAllData = async (req, res) => {
    await adminIsAuthenticated(req, res) ;
    const admins = await Admin.find({}).exec() ;
    const visitorLogs = await VisitorLog.find({}).exec() ;
    const Students = await Student.find({}).exec() ;
    const allotments = await Allotment.find({}).exec() ;
    const groups = await group.find({}).exec() ;
    const supervisors = await supervisor.find({}).exec() ;
    const panels = await panel.find({}).exec() ;
    const rentReceipts = await RentReceipts.find({}).exec() ;
    const expenses = await Expense.find({}).exec() ;

    return res.status(status("OK")).json({ message: "All Data retrieved successfully", 
                    admins: admins, 
                    visitorLogs: visitorLogs, 
                    Students: Students,
                    allotments: allotments,
                    groups: groups,
                    supervisors: supervisors,
                    panels: panels,
                    rentReceipts: rentReceipts,
                    expenses: expenses,
                    }) ;
}

exports.register = register;
exports.login = login;
exports.getAllAdmins = getAllAdmins;
exports.getAllData = getAllData;