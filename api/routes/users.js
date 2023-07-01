const express = require("express");
const User = require("../controllers/users.js");

const router = express.Router();

router.get("/test", User);

module.exports = router;
