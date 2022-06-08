"use strict";

const jsonwebtoken = require("jsonwebtoken");
const config = require("../config");
const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");

dotenvExpand(dotenv.config());

const authenticateRequest = async (req, res, next) => {
  const jwt = req.signedCookies["HMS_TOKEN"];
  console.log("AUTH", jwt);
  // console.log("Cookies: ", req.signedCookies["HMS_TOKEN"])
  // console.log("Cookies: ", req.cookies["HMS_TOKEN"])
  if (!jwt || jwt === "") {
    req.isAuthorized = false;
    return next();
  }

  jsonwebtoken.verify(jwt, config.privateKeys.jwtPrivateKey, { complete: true }, (error, decoded) => {
    console.log("In AUTH");
    if (error) {
      req.isAuthorized = false;
      console.log("False AUTH");
      return next();
    }

    console.log("True AUTH");
    req.isAuthorized = true;
    req.id = decoded.payload.id;
    next();
  });
};

exports.authenticateRequest = authenticateRequest;
