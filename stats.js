var si = require('systeminformation')
var sleep = require('system-sleep')
var redis = require('redis')
var moment = require('moment')

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
  redisIP = process.env.SB_IP
} else if (process.env.sb_ip) {
  redisIP = process.env.sb_ip
}

var stats_wait = 1
if (process.env.SB_STATS) {
  stats_wait = process.env.SB_STATS
} else if (process.env.sb_stats) {
  stats_wait = process.env.sb_stats
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

si.getDynamicData()
  .then(data => {
    old_diskio_read = data.disksIO['rIO']
    old_diskio_write = data.disksIO['wIO']
    old_diskio_total = data.disksIO['tIO']
    old_fsstats_read = data.fsStats['rx']
    old_fsstats_write = data.fsStats['wx']
    old_fsstats_total = data.fsStats['tx']
    old_net_rx_bytes = data.networkStats[0]['rx_bytes']
    old_net_tx_bytes = data.networkStats[0]['tx_bytes']
  })

sleep(stats_wait * 1000)

while (1) {
  si.getDynamicData()
    .then(data => {
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
      var BSRx = Math.round(((new_fsstats_read - old_fsstats_read) / stats_wait ))
      var BSWx = Math.round(((new_fsstats_write - old_fsstats_write) / stats_wait ))
      var BSTx = Math.round(((new_fsstats_total - old_fsstats_total) / stats_wait ))
      var NetRx = Math.round(((new_net_rx_bytes - old_net_rx_bytes) / stats_wait ))
      var NetTx = Math.round(((new_net_tx_bytes - old_net_tx_bytes) / stats_wait ))
      redisKey = moment().format('YYYYMMDDHHmmss')
      client.hmset(testhost + ':' + redisKey,
        'IORx', IORx, 'IOWx', IOWx, 'IOTx', IOTx,
        'ByRx', ByRx, 'ByWx', ByWx, 'ByTx', ByTx,
        'BSRx', BSRx, 'BSWx', BSWx, 'BSTx', BSTx,
        'LoadU', new_load_user, 'LoadS', new_load_system, 'LoadI', new_load_idle,
        'NetRx', NetRx, 'NetTx', NetTx,
        'MemU', new_mem_used, 'MemF', new_mem_free,
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
      old_diskio_read = data.disksIO['rIO']
      old_diskio_write = data.disksIO['wIO']
      old_diskio_total = data.disksIO['tIO']
      old_fsstats_read = data.fsStats['rx']
      old_fsstats_write = data.fsStats['wx']
      old_fsstats_total = data.fsStats['tx']
      old_net_rx_bytes = data.networkStats[0]['rx_bytes']
      old_net_tx_bytes = data.networkStats[0]['tx_bytes']
    })
  sleep(stats_wait * 1000)
}

process.exit(1)
