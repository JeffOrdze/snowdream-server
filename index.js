require("dotenv").config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5050

app.use(express.json());

const requestRoutes = require('./routes/request')


app.listen(PORT, () => { 
    console.log(`running at http://localhost:${PORT}`)
})