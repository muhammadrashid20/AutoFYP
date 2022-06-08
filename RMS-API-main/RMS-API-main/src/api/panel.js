"use strict";

const express = require("express");
const services = require("../services");

const panelRouter = express.Router();

panelRouter.get("/", services.panelService.gettingpanels);
panelRouter.post("/", services.panelService.postingpanels);
panelRouter.delete("/", services.panelService.deletingpanels);
panelRouter.delete("/:panelId", services.panelService.deletepanel);


exports.panelRouter = panelRouter;
