var filesystem = require('fs')
var spawnSync = require('child_process').spawnSync

var testloop = process.argv[2]
if (testloop == null) { testloop = 1 }

spawnSync('bash', ['copy1.sh', testloop],
    { stdio: [null, process.stdout, process.stderr] }
  )

while (1) {
  spawnSync('bash', ['copy2.sh', testloop],
    { stdio: [null, process.stdout, process.stderr] }
  )
}
