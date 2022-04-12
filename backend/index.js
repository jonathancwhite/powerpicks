const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 3000

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/leagues', require('./routes/leagueRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))

// const CONNECTION_URL = 'mongodb+srv://powerpicksadmin:suPrsi2C5E3R6FX@cluster0.zigoy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'