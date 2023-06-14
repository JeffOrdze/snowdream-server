const axios = require("axios");

const getArea = (req, res) => {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${req.params.lat}&lon=${req.params.lon}&appid=e1c63c565e9a56e8c189e1115ba790cc&units=metric`
    )
    .then((response) => {
      const { weather, main, wind, clouds, name } = response.data;
      return res.status(201).json({ name, weather, main, wind, clouds });
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
