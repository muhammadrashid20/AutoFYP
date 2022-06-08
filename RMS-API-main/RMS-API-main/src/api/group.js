"use strict";

const express = require("express");
const services = require("../services");

const groupRouter = express.Router();

groupRouter.get("/", services.groupService.gettinggroups);
groupRouter.post("/", services.groupService.postinggroups);
groupRouter.delete("/", services.groupService.deletinggroups);
groupRouter.delete("/:groupId", services.groupService.deletegroup);


exports.groupRouter = groupRouter;
