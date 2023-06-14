const axios = require("axios");

const getArea = (req, res) => {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/forecast/?lat=${req.params.lat}&lon=${req.params.lon}&cnt=3&appid=e1c63c565e9a56e8c189e1115ba790cc&units=metric`
    )
    .then((response) => {
      const { list } = response.data;
      return res.status(201).json( list );
    })
    .catch((err) => {
      return res
        .status(400)
        .json({
          message: "An error occured in your request please try again.",
        });
    });
};

module.exports = {
  getArea,
};
