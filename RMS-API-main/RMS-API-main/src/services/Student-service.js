"use strict";

const status = require("statuses");
const { Student, Admin } = require("../models");
const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken");
const { hash, compare } = require("bcryptjs");
const config = require("../config");

const gettingStudent = async (req, res) => {
  // await adminIsAuthenticated(req, res);
  const data = await Student.find({}).exec();
  return res.status(status("OK")).json({
    message: "Students Retrieved Successfully",
    data: data,
  });
};

const postingStudent = async (req, res) => {
  const { student } = req.body;
  console.log("Students", student);
  for (var i = 0; i < student.length; i++) {
    const userAlreadyRegistered = await Student.find({ email: student[i].email }).exec();
    console.log("IS EXIST", userAlreadyRegistered);
    if (userAlreadyRegistered.length === 0) {
      await Student.create({
        _id: mongoose.Types.ObjectId(),
        name: student[i].name,
        email: student[i].email,
        password: await hash(student[i].password, 12),
        // photo: photo,
      });
    }
  }

  return res.status(status("OK")).json({ message: "Student Created Successfully" });
};

const updatingStudent = async (req, res) => {
  await adminIsAuthenticated(req, res);
  const { name, email, password, photo } = req.body;
  const { id } = req.params;
  const allot = await Student.findById(id);
  if (name) allot.name = name;
  if (email) allot.email = email;
  if (password) allot.password = await hash(password, 12);
  if (photo) allot.photo = photo;
  await allot.save();
  return res.status(status("OK")).json({ message: "Student Updated Successfully" });
};

const deletingStudent = async (req, res) => {
  // await adminIsAuthenticated(req, res);
  var resp = await Student.deleteMany({}).exec();
  return res.status(status("OK")).json({ message: "Students Deleted Successfully", status: resp });
};

const deleteStudent = async (req, res) => {
  await adminIsAuthenticated(req, res);
  const StudentId = req.params.StudentId;
  const del = await Student.findById(StudentId).exec();
  var resp = await Student.deleteOne(del).exec();
  return res.status(status("OK")).json({ message: "Student Deleted Successfully", status: resp });
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

  const admin = await Student.findOne({ email: email }).exec();

  if (!admin) {
    return res.status(status("OK")).json({ message: "Student does not exist" });
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
  return res.status(status("OK")).json({ message: "Student logged in successfully", token: token });
};
const adminIsAuthenticated = async (req, res) => {
  const { isAuthorized, id } = req;

  if (!isAuthorized) {
    return res.status(status("BAD REQUEST")).json({ message: "Admin is not authenticated" });
  }

  const admin = await Admin.findOne({ _id: id }).exec();
  const student = await Student.findOne({ _id: id }).exec();
  if (admin) {
    return admin;
  }
  if (student) {
    return student;
  } else {
    return res.status(status("BAD REQUEST")).json({ message: "Admin does not exist" });
  }
};

exports.gettingStudent = gettingStudent;
exports.postingStudent = postingStudent;
exports.updatingStudent = updatingStudent;
exports.deletingStudent = deletingStudent;
exports.deleteStudent = deleteStudent;
exports.login = login;
