const express = require('express') // Backend App (server)
const cors = require('cors') // HTTP headers (enable requests)
const { ORIGIN, PORT } = require('./constants')
const colors = require("colors")
const routes = require('./routes')

const connectDB = require('./utils/mongo')

// initialize app
const app = express()

// middlewares
app.use(cors({origin: ORIGIN}))
app.use(express.json({extended: true})) // body parser
app.use(express.urlencoded({ extended: false })) // url parser

connectDB()

routes(app)

// error handling
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send()
  next(new AppError('Not found', 404));
})

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`.magenta)
})

module.exports = app
