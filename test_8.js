var filesystem = require('fs')
var spawnSync = require('child_process').spawnSync

var testloop = process.argv[2]
if (testloop == null) { testloop = 1 }

spawnSync('ls', ['/mnt/mnt1/master_s', '|', 'while', 'read', 'FILENAME;' +
    'do', 'cp', '"/mnt/mnt1/master_s/$FILENAME"', '"/mnt/mnt2/temp_'+testloop+'_$FILENAME";', 'done'],
    { stdio: [null, process.stdout, process.stderr] }
  )
<!--
while (1) {
  spawnSync('find', ['/mnt/mnt2/', '-maxdepth', '1', '-name', '"temp_'+testloop+'_master*"', '-exec', 'cp', '{}', '/mnt/mnt1', '\;'],
    { stdio: [null, process.stdout, process.stderr] }
  )
}
-->