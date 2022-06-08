"use strict";

const express = require("express");
const services = require("../services");

const IdeaRouter = express.Router();

IdeaRouter.get("/",services.ideasService.gettingIdeas);
IdeaRouter.post("/", services.ideasService.postingIdeas);
IdeaRouter.delete("/", services.ideasService.deletingIdeas);
IdeaRouter.delete("/:logId", services.ideasService.deleteIdeas);

exports.IdeaRouter = IdeaRouter;
