require("dotenv").config()

const ORIGIN = '*'
const PORT = process.env.PORT || 4000

const MONGO_URI = process.env.MONGO_URI
const MONGO_DBNAME = process.env.MONGO_DBNAME
const MONGO_OPTIONS = {}

const JWT_SECRET = process.env.JWT_SECRET || 'unsafe_secret'

module.exports = {
  ORIGIN,
  PORT,
  MONGO_URI,
  MONGO_OPTIONS,
  JWT_SECRET,
  MONGO_DBNAME,
}
