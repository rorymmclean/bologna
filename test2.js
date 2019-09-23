var fs = require('fs')
var Promise = require('promise')

var data = 'New File Contents'

function test1 () {
  return new Promise(function (resolve, reject) {
    for (var i = 0; i < 400000; i++) {
      fs.writeFileSync('temp2.txt', data)
    }
  })
}

function test1caller () {
  console.log('Test Started')
  test1().then(function (result) {
    console.log('Test Ended')
  })
}

test1caller()
