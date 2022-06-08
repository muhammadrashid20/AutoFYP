"use strict";

const visitorLogService = require("./visitorLog-service") ;
const StudentService = require("./Student-service") ;
const allotmentService = require("./allotment-service") ;
const groupService = require("./group-service") ;
const supervisorService = require("./supervisor-service") ;
const panelService = require("./panel-service");
const rentReceiptsService = require("./rentReceipts-service") ;
const expenseService = require("./expense-service");
const annoucementService = require("./annoucement-service");
const ideasService = require("./ideas-service");
const adminService = require("./admin-service");

exports.visitorLogService = visitorLogService;
exports.StudentService = StudentService;
exports.allotmentService = allotmentService;
exports.groupService = groupService;
exports.supervisorService = supervisorService;
exports.panelService = panelService;
exports.rentReceiptsService = rentReceiptsService;
exports.expenseService = expenseService ;
exports.annoucementService = annoucementService;
exports.ideasService = ideasService;
exports.adminService = adminService;