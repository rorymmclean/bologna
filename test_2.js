var fs = require('fs')
var sleep = require('system-sleep')
var randomstring = require('randomstring')

const homedir = require('os').homedir()
var testloop = process.argv[2]
if (testloop != null) {
  testloop = 1    
}

var counter = 0
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
  //buffer.fill(0)
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
  // counter++
  data = randomstring.generate(4000)
  fs.writeFileSync(homedir + '/TESTMNT/temp' + testloop + '.txt', data)
  sleep(redisSpeed)
  myreadFileSync(homedir + '/TESTMNT/temp' + testloop + '.txt')
  sleep(redisSpeed)
  // console.log(counter)
}

console.log('Test Loop #' + testloop + ' finished')

process.exit(1)
