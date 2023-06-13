require("dotenv").config();

const express = require('express');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 5050
const SERVER_URL = process.env.SERVER_URL
app.use(express.json());
app.use(cors());

const avalancheRoutes = require('./routes/avalanche-routes')

app.use("/avalanche", avalancheRoutes)


app.listen(PORT, () => { 
    console.log(`running at ${SERVER_URL}${PORT}`)
})