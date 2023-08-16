const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const connectDB = require('./config.js')
const prescreener = require('./dataModel.js')
const asyncHandler = require('express-async-handler')
const gibberish = require('gibberish-detective')({ useCache: false })
gibberish.set('useCache', true)

const app = express()

connectDB()

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'views')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'page_1.html'))
})

app.get('/page_2', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'page_2.html'))
})

app.get('/page_3', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'page_3.html'))
})

app.get('/new_page', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'page_new.html'))
})

app.post(
  '/submit',
  asyncHandler(async (req, res) => {
    const { gender, numericOdd, age, oddOne, surveyPreference } = req.body
    const isGibberish = gibberish.detect(surveyPreference)

    if (gender && numericOdd && age && oddOne && surveyPreference) {
      if (isGibberish) {
        res.status(400).json({
          message: 'Error! Gibberish detected!!!',
        })
      } else {
        if (oddOne !== 'AeroPlane') {
          res.status(401).json({
            message: 'Wrong One Selected',
          })
        } else if (age < 18 || age > 99) {
          res.status(400).json({
            message: 'Wrong Age',
          })
        } else if (numericOdd !== '9') {
          res.status(400).json({
            message: 'Wrong Math',
          })
        } else {
          const validation = true
          const data = await prescreener.create({
            gender,
            numericOdd,
            age,
            validation,
            surveyPreference,
          })
          console.log(data)
          res.status(201).json({
            message: 'Success!!!',
          })
        }
      }
    } else {
      res.status(400).json({
        message: 'Include all fields!!',
      })
    }
  })
)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
