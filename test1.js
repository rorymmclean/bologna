var fs = require('fs')

var data = 'New File Contents'

function test1 () {
  for (var i = 0; i < 1000000; i++) {
    fs.writeFileSync('temp2.txt', data)
  }
}

test1()
