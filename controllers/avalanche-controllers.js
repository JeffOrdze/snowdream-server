const axios = require("axios");

const getAllAreas = (req, res) => {
  axios
    .get(
      `https://api.avalanche.ca/forecasts/en/products/point?${req.params.location}`
    )
    .then((response) => {
      const responseData = response.data;
      res.status(201).json(responseData);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = {
  getAllAreas,
};
