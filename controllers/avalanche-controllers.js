const axios = require("axios");
const knex = require("knex")(require("../knexfile"));

const getArea = (req, res) => {
  axios
    .get(
      `https://api.avalanche.ca/forecasts/en/products/point?lat=${req.params.lat}&long=${req.params.lon}`
    )
    .then((response) => {
      const { highlights, confidence, summaries, dangerRatings } =
        response.data.report;
      if (!summaries) {
        return res
          .status(404)
          .json({ message: "There is no avalanche report for this area" });
      }
      return res
        .status(201)
        .json({ highlights, confidence, summaries, dangerRatings });
    })
    .catch((err) => {
      return res.status(400).json({
        message: "An error occured in your request, please try again.",
      });
    });
};

const getAll = (_req, res) => {
  knex("mountains")
    .select()
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      return res
        .status(400)
        .json({
          message: "An error occured in your request, please try again.",
        });
    });
};

module.exports = {
  getArea,
  getAll,
};
