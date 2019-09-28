var express = require('express')
var router = express.Router()
var si = require('systeminformation')
var spawn = require('child_process')

var max1 = 0
var max2 = 0
var max3 = 0
var max4 = 0

function randomInt (low, high) {
  return Math.floor(Math.random() * (high - low) + low)
}

router.get('/', function (req, res) {
  var pcount1 = 0
  var pcount2 = 0
  var pcount3 = 0
  var pcount4 = 0
  si.processes()
    .then(data => {
      var dataf =
          data.list.filter(function (el) {
            return el.params >= 'test_1' 
              && el.params <= 'test_99'
              && el.command == 'node'  
          })
      for (var i = 0, len = dataf.length; i < len; i++) {
        // console.log(dataf[i].pid + '/' + dataf[i].params.substr(5,1))
        switch(dataf[i].params.substr(5,1)) {
          case '1':
            pcount1 += 1
            max1 = dataf[i].pid
            break;
          case '2':
            pcount2 += 1
            max2 = dataf[i].pid
            break;
          case '3':
            pcount3 += 1
            max3 = dataf[i].pid
            break;
          case '4':
            pcount4 += 1
            max4 = dataf[i].pid
        } 
      }
      console.log(max1+'/'+max2+'/'+max3+'/'+max4)
      res.render('agents', {
        page:'Home', 
        menuId:'home',
        pcount1: pcount1,
        pcount2: pcount2,
        pcount3: pcount3,
        pcount4: pcount4
      })
    })
})

router.post('/', function (req, res) {
  console.log(req.body)
  if (typeof req.body['up1.x'] !== 'undefined') { console.log(max1)
    spawn.spawn('node', ['test_1.js', randomInt(1000000, 10000000)], {
        detached: true }
    )
  }
  if (typeof req.body['down1.x'] !== 'undefined') {
    spawn.spawnSync('kill', [max1],
      { stdio: [null, process.stdout, process.stderr] }
    )
  }
  if (typeof req.body['up2.x'] !== 'undefined') {
    spawn.spawn('node', ['test_2.js', randomInt(1000000, 10000000)], {
      detached: true }
    )
  }
  if (typeof req.body['down2.x'] !== 'undefined') {
    spawn.spawnSync('kill', [max2],
      { stdio: [null, process.stdout, process.stderr] }
    )
  }
  if (typeof req.body['up3.x'] !== 'undefined') {
    spawn.spawn('node', ['test_3.js', randomInt(1000000, 10000000)], {
      detached: true }
    )
  }
  if (typeof req.body['down3.x'] !== 'undefined') {
    spawn.spawnSync('kill', [max3],
      { stdio: [null, process.stdout, process.stderr] }
    )
  }
  if (typeof req.body['up4.x'] !== 'undefined') {
    spawn.spawn('node', ['test_4.js'], {
      detached: true }
    )
  }
  if (typeof req.body['down4.x'] !== 'undefined') {
    spawn.spawnSync('kill', [max4],
      { stdio: [null, process.stdout, process.stderr] }
    )
  }
  res.redirect('/agents')
})

module.exports = router
