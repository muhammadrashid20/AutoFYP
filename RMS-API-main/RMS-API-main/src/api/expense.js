"use strict";

const express = require("express");
const services = require("../services");

const expenseRouter = express.Router();

expenseRouter.get("/", services.expenseService.gettingExpenses);
expenseRouter.post("/", services.expenseService.postingExpenses);
expenseRouter.delete("/", services.expenseService.deletingExpenses);
expenseRouter.delete("/:expenseId", services.expenseService.deleteExpense);


exports.expenseRouter = expenseRouter;
