const mongoose = require('mongoose')

const preScreenerSchema = mongoose.Schema({
  gender: {
    type: String,
    required: [true, 'Please Enter Gender! '],
  },
  numericOdd: {
    type: Number,
    required: [true, 'Please Solve the Math Problems! '],
  },
  age: {
    type: Number,
    required: [true, 'Please Enter Age!'],
  },
  validation: {
    type: Boolean,
    default: false,
  },
  surveyPreference: {
    type: String,
    required: [true, 'Please Enter Survey Preference!'],
  },
})

module.exports = mongoose.model('prescreener', preScreenerSchema)
