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
var old_load_user = 0
var old_load_system = 0
var old_load_idle = 0
var old_net_rx_bytes = 0
var old_net_tx_bytes = 0

var new_diskio_read = 0
var new_diskio_write = 0
var new_diskio_total = 0
var new_fsstats_read = 0
var new_fsstats_write = 0
var new_fsstats_total = 0
var new_load_user = 0
var new_load_system = 0
var new_load_idle = 0
var new_mem_used = 0
var new_mem_free = 0
var new_net_rx_bytes = 0
var new_net_tx_bytes = 0

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
    old_net_rx_bytes = data.networkStats[0]['rx_bytes']
    old_net_tx_bytes = data.networkStats[0]['tx_bytes']
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
        new_load_user = data.currentLoad['currentload_user']
        new_load_system = data.currentLoad['currentload_system']
        new_load_idle = data.currentLoad['currentload_idle']
        new_net_rx_bytes = data.networkStats[0]['rx_bytes']
        new_net_tx_bytes = data.networkStats[0]['tx_bytes']
        new_mem_used = data.mem['used']
        new_mem_free = data.mem['free']
        var IORx = (new_diskio_read - old_diskio_read)
        var IOWx = (new_diskio_write - old_diskio_write)
        var IOTx = (new_diskio_total - old_diskio_total)
        var ByRx = (new_fsstats_read - old_fsstats_read)
        var ByWx = (new_fsstats_write - old_fsstats_write)
        var ByTx = (new_fsstats_total - old_fsstats_total)
        var BSRx = Math.round(((new_fsstats_read - old_fsstats_read) / 10))
        var BSWx = Math.round(((new_fsstats_write - old_fsstats_write) / 10))
        var BSTx = Math.round(((new_fsstats_total - old_fsstats_total) / 10))
        var NetRx = Math.round(((new_net_rx_bytes - old_net_rx_bytes) / 10))
        var NetTx = Math.round(((new_net_tx_bytes - old_net_tx_bytes) / 10))
      })
    redisKey = moment().format('YYYYMMDDHHmmss')
    client.hmset(testhost + ':' + redisKey,
      'metric1', IORx, 'metric2', IOWx, 'metric3', IOTx,
      'metric4', ByRx, 'metric5', ByWx, 'metric6', ByTx,
      'metric7', BSRx, 'metric8', BSWx, 'metric9', BSTx,
      'metric10', new_load_user, 'metric11', new_load_system, 'metric12', new_load_idle,
      'metric13', NetRx, 'metric14', NetTx,
      'metric15', new_mem_used, 'metric16', new_mem_free,
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
process.exit(1)
