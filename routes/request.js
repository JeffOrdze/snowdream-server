const express = require("express");
require("dotenv").config();
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID = process.env.CLIENT_SECRET;
const CLIENT_SECRET = process.env.CLIENT_SECRET;






module.exports = router;
