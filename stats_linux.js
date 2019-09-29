var iostat = require('iostat')
var moment = require('moment')

var os = require('os')
var testhost = os.hostname()
var redisKey = 0

function setToZero (value) {
  if (isNaN(value)) {
  return 0
  } else {
  return value
  }
}

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

console.log(redisPort)
console.log(redisIP)

iostat(['-x', '-m', '10']).on('data', function (err, stats) {
  diskio_1_read = 0
  diskio_1_write = 0
  diskio_1_total = 0
  diskkb_1_read = 0
  diskkb_1_write = 0
  diskkb_1_total = 0
  diskkbs_1_read = 0
  diskkbs_1_write = 0
  diskkbs_1_total = 0
  disk_1_await = 0
  disk_1_svctm = 0
  disk_1_util = 0
  disk_1_name = ''
  diskio_2_read = 0
  diskio_2_write = 0
  diskio_2_total = 0
  diskkb_2_read = 0
  diskkb_2_write = 0
  diskkb_2_total = 0
  diskkbs_2_read = 0
  diskkbs_2_write = 0
  diskkbs_2_total = 0
  disk_2_await = 0
  disk_2_svctm = 0
  disk_2_util = 0
  disk_2_name = ''
  diskio_3_read = 0
  diskio_3_write = 0
  diskio_3_total = 0
  diskkb_3_read = 0
  diskkb_3_write = 0
  diskkb_3_total = 0
  diskkbs_3_read = 0
  diskkbs_3_write = 0
  diskkbs_3_total = 0
  disk_3_await = 0
  disk_3_svctm = 0
  disk_3_util = 0
  disk_3_name = ''
  oad_user = setToZero(stats.cpu['%user'])
  load_system = setToZero(stats.cpu['%system'])
  load_idle = setToZero(stats.cpu['%idle'])
  load_iowait = setToZero(stats.cpu['%iowait'])
  mydrive = stats.devices 
  //drive 1
  if (Object.keys(mydrive).length >= 1) {
    diskio_1_read = setToZero(stats.devices[Object.keys(mydrive)[0]]['r/s'])*10
    diskio_1_write = setToZero(stats.devices[Object.keys(mydrive)[0]]['w/s'])*10
    diskio_1_total = diskio_1_read + diskio_1_write
    diskkb_1_read = setToZero(stats.devices[Object.keys(mydrive)[0]]['rMB/s'])*10
    diskkb_1_write = setToZero(stats.devices[Object.keys(mydrive)[0]]['wMB/s'])*10
    diskkb_1_total = diskkb_1_read + diskkb_1_write
    diskkbs_1_read = setToZero(stats.devices[Object.keys(mydrive)[0]]['rMB/s'])
    diskkbs_1_write = setToZero(stats.devices[Object.keys(mydrive)[0]]['wMB/s'])
    diskkbs_1_total = diskkbs_1_read + diskkbs_1_write
    disk_1_await = setToZero(stats.devices[Object.keys(mydrive)[0]]['await'])
    disk_1_svctm = setToZero(stats.devices[Object.keys(mydrive)[0]]['svctm'])
    disk_1_util = setToZero(stats.devices[Object.keys(mydrive)[0]]['%util'])
    disk_1_name = Object.keys(mydrive)[0]
  }
  if (Object.keys(mydrive).length >= 2) {
    diskio_2_read = setToZero(stats.devices[Object.keys(mydrive)[1]]['r/s']*10)
    diskio_2_write = setToZero(stats.devices[Object.keys(mydrive)[1]]['w/s']*10)
    diskio_2_total = diskio_2_read + diskio_2_write
    diskkb_2_read = setToZero(stats.devices[Object.keys(mydrive)[1]]['rMB/s']*10)
    diskkb_2_write = setToZero(stats.devices[Object.keys(mydrive)[1]]['wMB/s']*10)
    diskkb_2_total = diskkb_2_read + diskkb_2_write
    diskkbs_2_read = setToZero(stats.devices[Object.keys(mydrive)[1]]['rMB/s'])
    diskkbs_2_write = setToZero(stats.devices[Object.keys(mydrive)[1]]['wMB/s'])
    diskkbs_2_total = diskkbs_2_read + diskkbs_2_write
    disk_2_await = setToZero(stats.devices[Object.keys(mydrive)[1]]['await'])
    disk_2_svctm = setToZero(stats.devices[Object.keys(mydrive)[1]]['svctm'])
    disk_2_util = setToZero(stats.devices[Object.keys(mydrive)[1]]['%util'])
    disk_2_name = Object.keys(mydrive)[1]
  }
  if (Object.keys(mydrive).length >= 3) {
    diskio_3_read = setToZero(stats.devices[Object.keys(mydrive)[2]]['r/s']*10)
    diskio_3_write = setToZero(stats.devices[Object.keys(mydrive)[2]]['w/s']*10)
    diskio_3_total = diskio_3_read + diskio_3_write
    diskkb_3_read = setToZero(stats.devices[Object.keys(mydrive)[2]]['rMB/s']*10)
    diskkb_3_write = setToZero(stats.devices[Object.keys(mydrive)[2]]['wMB/s']*10)
    diskkb_3_total = diskkb_3_read + diskkb_3_write
    diskkbs_3_read = setToZero(stats.devices[Object.keys(mydrive)[2]]['rMB/s'])
    diskkbs_3_write = setToZero(stats.devices[Object.keys(mydrive)[2]]['wMB/s'])
    diskkbs_3_total = diskkbs_3_read + diskkbs_3_write
    disk_3_await = setToZero(stats.devices[Object.keys(mydrive)[2]]['await'])
    disk_3_svctm = setToZero(stats.devices[Object.keys(mydrive)[2]]['svctm'])
    disk_3_util = setToZero(stats.devices[Object.keys(mydrive)[2]]['%util'])
    disk_3_name = Object.keys(mydrive)[2]
  }
  redisKey = moment().format('YYYYMMDDHHmmss')
  client.hmset(testhost + ':' + redisKey,
  'IORx1', diskio_1_read, 'IOWx1', diskio_1_write, 'IOTx1', diskio_1_total,
  'ByRx1', diskkb_1_read, 'ByWx1', diskkb_1_write, 'ByTx1', diskkb_1_total,
  'BSRx1', diskkbs_1_read, 'BSWx1', diskkbs_1_write, 'BSTx1', diskkbs_1_total,
  'Await1', disk_1_await, 'SvcTm1', disk_1_svctm, 'Util1', disk_1_util,
  'IORx2', diskio_2_read, 'IOWx2', diskio_2_write, 'IOTx1', diskio_2_total,
  'ByRx2', diskkb_2_read, 'ByWx2', diskkb_2_write, 'ByTx1', diskkb_2_total,
  'BSRx2', diskkbs_2_read, 'BSWx2', diskkbs_2_write, 'BSTx2', diskkbs_2_total,
  'Await2', disk_2_await, 'SvcTm2', disk_2_svctm, 'Util2', disk_2_util,
  'IORx2', diskio_3_read, 'IOWx2', diskio_3_write, 'IOTx1', diskio_3_total,
  'ByRx2', diskkb_3_read, 'ByWx2', diskkb_3_write, 'ByTx1', diskkb_3_total,
  'BSRx2', diskkbs_3_read, 'BSWx2', diskkbs_3_write, 'BSTx2', diskkbs_3_total,
  'Await2', disk_3_await, 'SvcTm2', disk_3_svctm, 'Util2', disk_3_util,
  'Drive1', disk_1_name, 'Drive2', disk_2_name, 'Drive3', disk_3_name,
  'LoadU', new_load_user, 'LoadS', new_load_system, 
  'LoadI', new_load_idle, 'LoadIO', new_load_iowait,
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
})

process.exit(1)
