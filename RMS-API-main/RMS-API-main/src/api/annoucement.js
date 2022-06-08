"use strict";

const express = require("express");
const services = require("../services");

const AnnoucementRouter = express.Router();

AnnoucementRouter.get("/",services.annoucementService.gettingAnnoucements);
AnnoucementRouter.post("/", services.annoucementService.postingAnnoucements);
AnnoucementRouter.delete("/", services.annoucementService.deletingAnnoucements);
AnnoucementRouter.delete("/:logId", services.annoucementService.deleteAnnoucements);


exports.AnnoucementRouter = AnnoucementRouter;
