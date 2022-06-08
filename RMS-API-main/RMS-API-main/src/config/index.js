"use strict";

const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");

dotenvExpand(dotenv.config());

const {
  PORT,
  DATABASE_URI,
  JSON_WEB_TOKEN_PRIVATE_KEY,
  JSON_WEB_TOKEN_COOKIE_PRIVATE_KEY,
} = process.env;

const serverConfig = {
  port: PORT,
};

const databaseConfig = {
  uri: 'mongodb+srv://fyp:fyp@cluster0.65qor.mongodb.net/fyp?retryWrites=true&w=majority',
};
// const databaseConfig = {
//   uri: DATABASE_URI,
// };
// const privateKeys = {
//   jwtPrivateKey: JSON_WEB_TOKEN_PRIVATE_KEY,
//   cookiePrivateKey: JSON_WEB_TOKEN_COOKIE_PRIVATE_KEY,
// };
const privateKeys = {
  jwtPrivateKey: "^CAUNRDoIg<)(|J+fb}<icc-Emg.lNCL2.z%R2I>/=|CjCYG]LGkE-@@X`@k)B(C:Q8^iU",
  cookiePrivateKey: "2x}lGV`ky-c^x%I?-x`|$))]z+2^J$/G]tu9;|g_}rn-}]-|~vO<s)B(C:}]-|~",
};

exports.serverConfig = serverConfig;
exports.databaseConfig = databaseConfig;
exports.privateKeys = privateKeys;