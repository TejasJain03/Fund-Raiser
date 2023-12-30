const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()
const ExpressError = require('./middleware/ExpressError')
const campaignRoutes = require('./routes/campaign')
const userRoutes = require('./routes/userRoutes')
const donationRoutes = require('./routes/donationRoutes')
const reveiwRoutes = require('./routes/reviewRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const GlobalErrorHandler = require('./middleware/GlobalErrorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL)
    console.log('Connected to Mongo succesfully')
  } catch (err) {
    console.log('Error while connecting to database')
  }
}
connectDB()

const PORT = process.env.PORT || 8000

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api', campaignRoutes)
app.use('/api', userRoutes)
app.use('/api', donationRoutes)
app.use('/api', reveiwRoutes)
app.use('/api', paymentRoutes)

app.all('*', (req, res, next) => {
  try {
    new ExpressError(404, false, 'Page not found')
  } catch (error) {
    next(error)
  }
})

app.use(GlobalErrorHandler)

app.listen(PORT, () => {
  console.log('LISTENING TO THE PORT')
})
