"use strict";

const express = require("express");
const services = require("../services");

const rentReceiptsRouter = express.Router();

rentReceiptsRouter.get("/", services.rentReceiptsService.gettingRentReceipts);
rentReceiptsRouter.post("/", services.rentReceiptsService.postingRentReceipts);
rentReceiptsRouter.delete("/", services.rentReceiptsService.deletingRentReceipts);
rentReceiptsRouter.delete("/:rentReceiptsId", services.rentReceiptsService.deleteRentReceipt);


exports.rentReceiptsRouter = rentReceiptsRouter;
