var filesystem = require('fs')
var spawnSync = require('child_process').spawnSync

const homedir = require('os').homedir()
var testpath = homedir+'/TESTMNT/'
if (process.env.SB_PATH) {
  testpath = process.env.SB_PATH
} else if (process.env.sb_path) {
  testpath = process.env.sb_path
}

var testloop = process.argv[2]
if (testloop == null) { testloop = 1 }
var filepath = testpath + 'temp_3_' + testloop + '.txt'

if (!(filesystem.existsSync(filepath))) {
  spawnSync('dd', ['if=/dev/urandom', 'of=' + filepath, 'count=1024', 'bs=1048576'],
    { stdio: [null, process.stdout, process.stderr] }
  )
  console.log('Test File Created')
}

while (1) {
  filesystem.readFileSync(filepath, { flag: 'rs' })
}
