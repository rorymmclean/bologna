var si = require('systeminformation');
var sleep = require('system-sleep')

var old_diskio_read = 0
var old_diskio_write = 0
var old_diskio_total = 0
var old_fsstats_read = 0
var old_fsstats_write = 0
var old_fsstats_total = 0

var new_diskio_read = 0
var new_diskio_write = 0
var new_diskio_total = 0
var new_fsstats_read = 0
var new_fsstats_write = 0
var new_fsstats_total = 0

si.getDynamicData()
  .then (data => {
    old_diskio_read = data.disksIO['rIO']
    old_diskio_write = data.disksIO['wIO']
    old_diskio_total = data.disksIO['tIO']
    old_fsstats_read = data.fsStats['rx']
    old_fsstats_write = data.fsStats['wx']
    old_fsstats_total = data.fsStats['tx']
  })

sleep(10000);  

si.getDynamicData()
  .then (data => {
    new_diskio_read = data.disksIO['rIO']
    new_diskio_write = data.disksIO['wIO']
    new_diskio_total = data.disksIO['tIO']
    new_fsstats_read = data.fsStats['rx']
    new_fsstats_write = data.fsStats['wx']
    new_fsstats_total = data.fsStats['tx']
    console.log('IORx: '+(new_diskio_read - old_diskio_read))
    console.log('IOWx: '+(new_diskio_write - old_diskio_write))
    console.log('IOTx: '+(new_diskio_total - old_diskio_total))
    console.log('ByRx: '+(new_fsstats_read - old_fsstats_read))
    console.log('ByWx: '+(new_fsstats_write - old_fsstats_write))
    console.log('ByTx: '+(new_fsstats_total - old_fsstats_total))
    console.log('BSRx: '+Math.round(((new_fsstats_read - old_fsstats_read)/(new_diskio_read - old_diskio_read))))
    console.log('BSWx: '+Math.round(((new_fsstats_write - old_fsstats_write)/(new_diskio_write - old_diskio_write))))
    console.log('BSTx: '+Math.round(((new_fsstats_total - old_fsstats_total)/(new_diskio_total - old_diskio_total))))
  })

// si.dockerContainerStats()
// si.dockerContainers()
// si.networkStats()
// si.fsStats()   
// si.disksIO()
//  .then(data => console.log(data))
//  .catch(error => console.error(error))
process.exit(1)
