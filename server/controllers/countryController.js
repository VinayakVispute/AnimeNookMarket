const Country = require("../models/CountryModel");

const getAllCountries = async (req, res) => {
  try {
    // Fetch all Countries from the database
    const countries = await Country.find();

    return res.status(200).json({
      success: true,
      data: countries,
    });
  } catch (error) {
    console.error("Error fetching Countries:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getAllCountries,
};
