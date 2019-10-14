const Big = require('big.js')

var counter = 1
var mypi = new Big(4)
var base = new Big(4)
var lc = 0

while (1) {
  mypi = mypi - (base / (counter + 2))
  mypi = mypi + (base / (counter + 4))
  //mypi = mypi.minus(base.div(counter + 2))
  //mypi = mypi.plus(base.div(counter + 4))
  counter = counter + 4
  lc = ((counter - 1) % 100000000)
  if (lc == 0) {
    console.log(mypi.toPrecision(50) + ' : ' + String(counter - 1).replace(/(.)(?=(\d{3})+$)/g,'$1,') )
    // 9,223,372,036,854,775,807
  }
}
