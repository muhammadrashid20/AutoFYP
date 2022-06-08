"use strict";

const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("../config");
const api = require("../api");
const { connectWithMongoDB } = require("./database");
const { authenticateRequest } = require("../auth");

const initializeServer = (serverPort) => {
  const backend = express();
  var whitelist = ['https://hms-web-admin.herokuapp.com', 'http://localhost:3000', 'http://localhost:3001']
  var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { 
        origin: true, 
        credentials:  true,
        exposedHeaders: ["set-cookie"], } // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
  }
  backend.use(cors(corsOptionsDelegate));
  backend.use(cookieParser(config.privateKeys.cookiePrivateKey));
  backend.use(authenticateRequest);
  backend.use(bodyParser.json({ limit: "50mb" }));
  backend.use("/visitorLog", api.visitorLog.visitorLogRouter);
  backend.use("/Student", api.Student.Studentrouter);
  backend.use("/allotment", api.allotment.allotmentRouter);
  backend.use("/group", api.group.groupRouter);
  backend.use("/supervisor", api.supervisor.supervisorRouter) ;
  backend.use("/panel", api.panel.panelRouter) ;
  backend.use("/rentreceipts", api.rentReceipts.rentReceiptsRouter);
  backend.use("/expense", api.expense.expenseRouter);
  backend.use("/admin", api.admin.adminRouter);
  backend.use("/annoucements", api.annoucement.AnnoucementRouter);
  backend.use("/ideas", api.ideas.IdeaRouter);

  connectWithMongoDB()
    .then(() => {
      backend.listen(serverPort);
      console.log("Server started listening on port", serverPort);
    })
    .catch((error) => {
      console.error(error);
    });
};

exports.initializeServer = initializeServer;
