const express = require("express");
const router = express.Router();
const { getAllCountries } = require("../controllers/countryController");

router.get("/", getAllCountries);

module.exports = router;
