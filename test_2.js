var fs = require('graceful-fs')
var sleep = require('system-sleep')
var randomstring = require('randomstring')

const homedir = require('os').homedir()
var testpath = homedir + '/TESTMNT/'
if (process.env.SB_PATH) {
  testpath = process.env.SB_PATH
} else if (process.env.sb_path) {
  testpath = process.env.sb_path
}

var testloop = process.argv[2]
if (testloop == null) { testloop = 1 }

var data = ''

console.log('Test Loop #' + testloop + ' started')

var redisSpeed = 0
if (process.env.SB_SLEEP) {
  redisSpeed = process.env.SB_SLEEP
} else if (process.env.sb_sleep) {
  redisSpeed = process.env.sb_sleep
}

console.log(redisSpeed)

data = randomstring.generate(4000)
fs.writeFileSync(testpath + 'temp_2_' + testloop + '_a.txt', data)

while (1) {
  fs.copyFileSync(testpath + 'temp_2_' + testloop + '_a.txt', testpath + 'temp_2_' + testloop + '_b.txt')
  sleep(redisSpeed)
  fs.copyFileSync(testpath + 'temp_2_' + testloop + '_b.txt', testpath + 'temp_2_' + testloop + '_a.txt')
  sleep(redisSpeed)
}
