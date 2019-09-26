var counter = 1
var mypi = 4 / 1
var lc = 0

while (1) {
  mypi = mypi - (4 / (counter + 2)) + (4 / (counter + 4))
  counter = counter + 4
  lc = ((counter - 1) % 1000000000)
  if (lc == 0) {
    console.log(mypi + ' : ' + counter)
  }
}
