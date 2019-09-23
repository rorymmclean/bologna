var fs = require('fs')
var sleep = require('system-sleep')
var moment = require('moment')
var redis = require('redis')

var testloop = process.argv[2]
var os = require('os')
var testhost = os.hostname()
var data = '#'.repeat(4000000)
var MyCounter = 0
var firstTime = moment()
var secondTime = 0
var BRW = 0
var Bsec = 0
var redisKey1 = ''
var redisKey2 = ''

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

var redisSpeed = 0
if (process.env.SB_SLEEP) {
  redisSpeed = process.env.SB_SLEEP
} else if (process.env.sb_sleep) {
  redisSpeed = process.env.SB_SLEEP
}

console.log(redisPort)
console.log(redisIP)
console.log(redisSpeed)

var client = redis.createClient(redisPort, redisIP)

client.on('error', function(err) {
  console.log('Error ' + err)
})

client.on('connect', function () {
  console.log('connected to ' + redisIP + ':' + redisPort)
})

while (1) {
  fs.writeFileSync('temp' + testloop + '.txt', data)
  sleep(redisSpeed)
  temp = fs.readFileSync('temp' + testloop + '.txt')
  sleep(redisSpeed)
  MyCounter++
  secondTime = moment()
  if ((secondTime - firstTime) > 10000) {
    BRW = (MyCounter * 4000000 * 2)
    Bsec = Math.round(BRW / (secondTime - firstTime))
    redisKey1 = testhost + '_' + testloop
    redisKey2 = moment().format('YYYYMMDDHHmmss')
    console.log(
      'Test Loop: ' + testloop +
      ' Counter: ' + MyCounter +
       ' Time: ' + (secondTime - firstTime))
    client.hmset(redisKey1 + ':' + redisKey2, 'metric1', Bsec, 'metric2', BRW, function (err, reply) {
      console.log(err)
      //console.log(reply)
    })
    client.rpush(redisKey1, redisKey2, function (err, reply) {
      console.log(err)
      //console.log(reply)
    })
    firstTime = secondTime
    MyCounter = 0
  }
}

console.log('Finished')
client.quit()
process.exit(1)
