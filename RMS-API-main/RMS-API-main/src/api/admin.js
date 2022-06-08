"use strict";

const express = require("express");
const services = require("../services");

const adminRouter = express.Router();

adminRouter.post("/register", services.adminService.register);
adminRouter.post("/login", services.adminService.login);
adminRouter.get("/get-all-admins", services.adminService.getAllAdmins);
adminRouter.get("/all-data", services.adminService.getAllData);


exports.adminRouter = adminRouter;
