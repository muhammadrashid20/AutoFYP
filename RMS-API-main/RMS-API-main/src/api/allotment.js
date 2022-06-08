"use strict";

const express = require("express");
const services = require("../services");

const allotmentRouter = express.Router();

allotmentRouter.get("/", services.allotmentService.gettingAllotments);
allotmentRouter.post("/", services.allotmentService.postingAllotments);
allotmentRouter.delete("/", services.allotmentService.deletingAllotments);
allotmentRouter.delete("/:allotmentId", services.allotmentService.deleteAllotment);


exports.allotmentRouter = allotmentRouter;
