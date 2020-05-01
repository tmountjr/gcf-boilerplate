const express = require('express')
const router = express.Router()

// Add new routes here. They can be imported...
const home = require('./home')
router.use(home)

// ...or defined directly.
router.get('/foo', (req, res) => {
  res.status(200).send('bar')
})

router.get('/env/:name', (req, res) => {
  const name = req.params.name;
  if (name in process.env) {
    res.status(200).send(process.env[name])
  } else {
    res.status(404).send(`Variable named ${name} not found.`)
  }
})

module.exports = router
