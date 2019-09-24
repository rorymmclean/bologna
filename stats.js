var si = require('systeminformation')
var moment = require('moment')
var redis = require('redis')

var os = require('os')
var testhost = os.hostname()
var redisKey = 0

var redisPort = 6379
if (process.env.SB_PORT) {
  redisPort = process.env.SB_PORT
} else if (process.env.sb_port) {
  redisPort = process.env.sb_port
}

var redisIP = '127.0.0.1'
if (process.env.SB_IP) {
  redisIP = process.env.IP
} else if (process.env.sb_ip) {
  redisIP = process.env.ip
}

console.log(redisPort)
console.log(redisIP)

var client = redis.createClient(redisPort, redisIP)

client.on('error', function (err) {
  console.log('Error ' + err)
})

client.on('connect', function () {
  console.log('connected to ' + redisIP + ':' + redisPort)
})

var old_diskio_read = 0
var old_diskio_write = 0
var old_diskio_total = 0
var old_fsstats_read = 0
var old_fsstats_write = 0
var old_fsstats_total = 0

var new_diskio_read = 0
var new_diskio_write = 0
var new_diskio_total = 0
var new_fsstats_read = 0
var new_fsstats_write = 0
var new_fsstats_total = 0

var firstTime = moment()
var secondTime = 0

si.getDynamicData()
  .then (data => {
    old_diskio_read = data.disksIO['rIO']
    old_diskio_write = data.disksIO['wIO']
    old_diskio_total = data.disksIO['tIO']
    old_fsstats_read = data.fsStats['rx']
    old_fsstats_write = data.fsStats['wx']
    old_fsstats_total = data.fsStats['tx']
  })

while (1) {
  secondTime = moment()
  if ((secondTime - firstTime) > 10000) {
    si.getDynamicData()
      .then (data => {
        new_diskio_read = data.disksIO['rIO']
        new_diskio_write = data.disksIO['wIO']
        new_diskio_total = data.disksIO['tIO']
        new_fsstats_read = data.fsStats['rx']
        new_fsstats_write = data.fsStats['wx']
        new_fsstats_total = data.fsStats['tx']
        var IORx = (new_diskio_read - old_diskio_read)
        var IOWx = (new_diskio_write - old_diskio_write)
        var IOTx = (new_diskio_total - old_diskio_total)
        var ByRx = (new_fsstats_read - old_fsstats_read)
        var ByWx = (new_fsstats_write - old_fsstats_write)
        var ByTx = (new_fsstats_total - old_fsstats_total)
        var BSRx = Math.round(((new_fsstats_read - old_fsstats_read) / (new_diskio_read - old_diskio_read)))
        var BSWx = Math.round(((new_fsstats_write - old_fsstats_write) / (new_diskio_write - old_diskio_write)))
        var BSTx = Math.round(((new_fsstats_total - old_fsstats_total) / (new_diskio_total - old_diskio_total)))
      })
    redisKey = moment().format('YYYYMMDDHHmmss')
    client.hmset(testhost + ':' + redisKey,
      'metric1', IORx, 'metric2', IOWx, 'metric3', IOTx,
      'metric4', ByRx, 'metric5', ByWx, 'metric6', ByTx,
      'metric7', BSRx, 'metric8', BSWx, 'metric9', BSTx,
      function (err, reply) {
        if (err != null) {
          console.log(err)
        }
        // console.log(reply)
      })
    client.rpush('L-' + testhost, redisKey, function (err, reply) {
      if (err != null) {
        console.log(err)
      }
      // console.log(reply)
    })
    firstTime = secondTime
  }
}

// si.dockerContainerStats()
// si.dockerContainers()
// si.networkStats()
// si.fsStats()
// si.disksIO()
//  .then(data => console.log(data))
//  .catch(error => console.error(error))
process.exit(1)
