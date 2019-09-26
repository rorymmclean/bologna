var fs = require('fs')
var sleep = require('system-sleep')
var randomstring = require('randomstring')

const homedir = require('os').homedir()
var testloop = process.argv[2]
if (testloop != null) {
  testloop = 1
}

function randomInt (low, high) {
  return Math.floor(Math.random() * (high - low) + low)
}

var data = ''

console.log('Test Loop #' + testloop + ' started')

var redisSpeed = 10
if (process.env.SB_SLEEP) {
  redisSpeed = process.env.SB_SLEEP
} else if (process.env.sb_sleep) {
  redisSpeed = process.env.SB_SLEEP
}

console.log(redisSpeed)

function myreadFileSync (filePath) {
  var fd = fs.openSync(filePath, 'rs')
  var content = ''
  var buffer = new Buffer.alloc(1024)
  var readCount = fs.readSync(fd, buffer, null, 1024)
  while (readCount > 0) {
    // console.log("Read " + readCount + " bytes.");
    content += buffer.toString().substr(0, readCount)
    readCount = fs.readSync(fd, buffer, null, 1024)
  }
  fs.closeSync(fd)
  // console.log("File content : " + content);
}

while (1) {
  data = randomstring.generate(randomInt(1000000, 6000000))
  fs.writeFileSync(homedir + '/TESTMNT/temp' + testloop + '.txt', data)
  sleep(redisSpeed)
  myreadFileSync(homedir + '/TESTMNT/temp' + testloop + '.txt')
  sleep(redisSpeed)
}
