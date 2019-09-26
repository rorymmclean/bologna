var filesystem = require('fs')
var spawnSync = require('child_process').spawnSync
const homedir = require('os').homedir()

var testloop = process.argv[2]
if (testloop != null) { testloop = 1 }
var filepath = homedir + '/TESTMNT/temp' + testloop + 'l.txt'

if (!(filesystem.existsSync(filepath))) {
  spawnSync('dd', ['if=/dev/urandom', 'of=' + filepath, 'count=1024', 'bs=1048576'],
    { stdio: [null, process.stdout, process.stderr] }
  )
  console.log('Test File Created')
}

while (1) {
  filesystem.readFileSync(filepath, { flag: 'rs' })
}
