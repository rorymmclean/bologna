var express = require('express')
var router = express.Router()
var os = require('os')
var myhost = os.hostname()

/* GET users listing. */
router.get('/', function (req, res, next) {
  // res.send('You are on the testing page...')
  res.send(myhost)
})

module.exports = router
