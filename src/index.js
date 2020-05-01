const dotenv = require('dotenv')
const express = require('express')
const logger = require('./middleware/logger')
const bodyParser = require('body-parser')

// Inject anything from the .env file into the environment variables
dotenv.config()

// Set up express server and default middleware
const app = express()
app.use(logger)
app.use(bodyParser.json())

// Router imports
const router = require('./router')
app.use(router)

// Primary entrypoint
exports.app = app