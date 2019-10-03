var express = require('express')
var router = express.Router()
var si = require('systeminformation')
var spawn = require('child_process')
var sleep = require('system-sleep')

var max1 = 0
var max2 = 0
var max3 = 0
var max4 = 0
var max5 = 0

function randomInt (low, high) {
  return Math.floor(Math.random() * (high - low) + low)
}

router.get('/', function (req, res) {
  var pcount1 = 0
  var pcount2 = 0
  var pcount3 = 0
  var pcount4 = 0
  var pcount5 = 0
  si.processes()
    .then(data => {
      var dataf =
          data.list.filter(function (el) {
            return el.params >= 'test_1' 
              && el.params <= 'test_99'
              && el.command == 'node'  
          })
      for (var i = 0, len = dataf.length; i < len; i++) {
        switch(dataf[i].params.substr(5,1)) {
          case '1':
            pcount1 += 1
            break;
          case '2':
            pcount2 += 1
            break;
          case '3':
            pcount3 += 1
            break;
          case '4':
            pcount4 += 1
            break;
          case '5':
            pcount5 += 1
          } 
      }
      res.render('agents', {
        page:'Agents', 
        menuId:'agents',
        pcount1: pcount1,
        pcount2: pcount2,
        pcount3: pcount3,
        pcount4: pcount4,
        pcount5: pcount5
      })
    })
})

router.post('/', function (req, res) {
  // console.log(req.body)
  si.processes()
  .then(data => {
    var dataf =
        data.list.filter(function (el) {
          return el.params >= 'test_1' 
            && el.params <= 'test_99'
            && el.command == 'node'  
        })
    for (var i = 0, len = dataf.length; i < len; i++) {
      switch(dataf[i].params.substr(5,1)) {
        case '1':
          max1 = dataf[i].pid
          break;
        case '2':
          max2 = dataf[i].pid
          break;
        case '3':
          max3 = dataf[i].pid
          break;
        case '4':
          max4 = dataf[i].pid
          break;
        case '5':
          max5 = dataf[i].pid
        } 
    }  
    console.log(max1+'/'+max2+'/'+max3+'/'+max4+'/'+max5)
    if (typeof req.body['up1.x'] !== 'undefined') { 
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
    if (typeof req.body['up5.x'] !== 'undefined') {
      spawn.spawn('node', ['test_5.js'], {
        detached: true }
      )
    }
    if (typeof req.body['down5.x'] !== 'undefined') {
      si.processes()
        .then(data => {
          var dataf =
            data.list.filter(function (el) {
              return el.parentPid == max5
            })
          for (var i = 0, len = dataf.length; i < len; i++) {
            console.log(dataf[i].pid+' : '+max5)
            pmax5 = dataf[i].pid
            spawn.spawnSync('kill', [pmax5],
              { stdio: [null, process.stdout, process.stderr] }
            )
          }
          spawn.spawnSync('kill', [max5],
            { stdio: [null, process.stdout, process.stderr] }
          )
        })
    }
    //sleep(1000)
    res.redirect('/agents')
  })
})  

module.exports = router
