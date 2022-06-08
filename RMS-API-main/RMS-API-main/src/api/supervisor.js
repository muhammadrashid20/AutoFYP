"use strict";

const express = require("express");
const services = require("../services");

const supervisorRouter = express.Router();

supervisorRouter.get("/", services.supervisorService.gettingsupervisors);
supervisorRouter.post("/", services.supervisorService.postingsupervisors);
supervisorRouter.delete("/", services.supervisorService.deletingsupervisors);
supervisorRouter.delete("/:supervisorId", services.supervisorService.deletesupervisor);


exports.supervisorRouter = supervisorRouter;
