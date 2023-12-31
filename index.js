require("dotenv").config();

const express = require('express');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 5050
const SERVER_URL = process.env.SERVER_URL

app.use(express.json());
app.use(cors());
app.use('/static', express.static('public'))

const avalancheRoutes = require('./routes/avalanche-routes')
const weatherRoutes = require('./routes/weather-routes')
const userRoutes = require("./routes/users-routes")

app.use("/avalanche", avalancheRoutes)
app.use("/weather", weatherRoutes)
app.use("/users", userRoutes)


app.listen(PORT, () => { 
    console.log(`running at ${SERVER_URL}${PORT}`)
})