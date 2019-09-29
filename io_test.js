var iostat = require('iostat');
iostat().on('data', function(err, stats) {
    console.log(stats.devices.sda1["%util"]); //e.g. 0.91 (as a Number, not a String)
});