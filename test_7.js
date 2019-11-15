var filesystem = require('fs')
var spawnSync = require('child_process').spawnSync

var testloop = process.argv[2]
if (testloop == null) { testloop = 1 }

while (1) {
  spawnSync('dd', ['if=/dev/urandom', 'of=/mnt/mnt1/temp_' + testloop + '.txt', 'count=10240', 'bs=1048576'],
    { stdio: [null, process.stdout, process.stderr] }
  )
}
