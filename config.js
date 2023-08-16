const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')

const connectDB = asyncHandler(async () => {
  try {
    const conn = await mongoose.connect(
      'mongodb+srv://om:ahhsaz5KKiNnSMza@cluster0.qlfj2tn.mongodb.net/'
    )
    console.log(`Database Successfully connected @ ${conn.connection.host}`)
  } catch (err) {
    console.log(err)
  }
})

module.exports = connectDB
