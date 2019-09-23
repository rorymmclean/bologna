var fs = require('fs')
var sleep = require('system-sleep')
var moment = require('moment')
var redis = require('redis')

var data = '#'.repeat(4000)
var MyCounter = 0
var firstTime = moment()
var secondTime = 0
var BRW = 0
var Bsec = 0
var redisKey = ''

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
  console.log('Error ' + err);
});

client.on('connect', function () {
  console.log('connected to ' + redisIP + ':' + redisPort)
})

for (var iii = 0; iii < 5000; iii++) {
  fs.writeFileSync('temp2.txt', data)
  temp = fs.readFileSync('temp2.txt')
  sleep(redisSpeed)
  MyCounter++
  secondTime = moment()
  console.log(
    'loop: ' + iii +
    ' Counter: ' + MyCounter +
    ' Time: ' + (secondTime - firstTime))
  client.rpush("test1", "test", function (err, reply) {
    console.log(err);
    console.log(reply);
  })    
  if ((secondTime - firstTime) > 5000) {
    BRW = (MyCounter * 4000 * 2)
    Bsec = Math.round(BRW / (secondTime - firstTime))
    redisKey = 'testserver:' + moment().format('YYYYMMDDHHmmss')
    // client.hmset(redisKey, 'metric1', Bsec, 'metric2', BRW)
    firstTime = secondTime
    MyCounter = 0
  }
}

console.log('Finished')
client.quit()
process.exit(1)
