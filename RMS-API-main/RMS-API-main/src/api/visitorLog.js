"use strict";

const express = require("express");
const services = require("../services");

const visitorLogRouter = express.Router();

visitorLogRouter.get("/", services.visitorLogService.gettingVisitorLogs);
visitorLogRouter.post("/", services.visitorLogService.postingVisitorLogs);
visitorLogRouter.delete("/", services.visitorLogService.deletingVisitorLogs);
visitorLogRouter.delete("/:logId", services.visitorLogService.deleteVisitorLog);


exports.visitorLogRouter = visitorLogRouter;
