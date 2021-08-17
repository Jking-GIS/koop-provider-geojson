// clean shutdown on `cntrl + c`
process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))

const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

// Initialize Koop
const Koop = require('koop')
const koop = new Koop()

// Install the geojson Provider
const provider = require('./')
koop.register(provider)

// Start listening for http traffic
const config = require('config')
const port = config.port || 5432

app.use('', koop.server)

const fs = require('fs')
const options = {
  key: fs.readFileSync('C:\\Users\\jeff9123\\Documents\\playground\\cert.key'),
  cert: fs.readFileSync('C:\\Users\\jeff9123\\Documents\\playground\\cert.pem')
}

const https = require('https')
https.createServer(options, app).listen(port)

// koop.server.listen(port)
console.log(`Koop GeoJSON listening on ${port}`)
console.log(`https://localhost:${port}/geojson/test/FeatureServer/0`)
