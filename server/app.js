const express = require('express') // Backend App (server)
const cors = require('cors') // HTTP headers (enable requests)
const { ORIGIN, PORT } = require('./constants')
const colors = require("colors")
const routes = require('./routes')
const crypto = require('crypto')
const promisify = require('util').promisify
const AWS = require('aws-sdk')
const dotenv = require('dotenv')
const mongoSanitize = require('express-mongo-sanitize')

dotenv.config()

const connectDB = require('./utils/mongo')

// initialize app
const app = express()

// middlewares
app.use(cors("*"))
app.use(express.json()) // body parser
app.use(express.urlencoded({ extended: true })) // url parser
app.use(mongoSanitize())

connectDB()

routes(app)

const s3 = new AWS.S3({
    region: process.env.REGION, // Change to your region
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    signatureVersion: 'v4'
});

const randomBytes = promisify(crypto.randomBytes)
async function generateUploadURL() {
    const rawBytes = await randomBytes(16)
    const imageName = rawBytes.toString('hex')
    const params = ({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: imageName,
        Expires: 60
    })

    const uploadURL = await s3.getSignedUrlPromise('putObject', params)

    return uploadURL
}

app.get("/s3URL", async (req, res) => {
    const url = await generateUploadURL()
    res.send({url})
}) 

app.post("/api/data", (req, res) => {
    const data = req.body
    res.status(200).json({ data: data, message: "Hello" })
})

// error handling
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send()
  next();
})

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`.magenta)
})

module.exports = app
