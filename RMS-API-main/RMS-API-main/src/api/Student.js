"use strict";

const express = require("express");
const services = require("../services");

const Studentrouter = express.Router();

Studentrouter.get("/", services.StudentService.gettingStudent);
Studentrouter.post("/", services.StudentService.postingStudent);
Studentrouter.post("/register", services.StudentService.postingStudent);
Studentrouter.post("/login", services.StudentService.login);
Studentrouter.delete("/", services.StudentService.deletingStudent);
Studentrouter.delete("/:StudentId", services.StudentService.deleteStudent);
Studentrouter.put("/:id", services.StudentService.updatingStudent);


exports.Studentrouter = Studentrouter;
