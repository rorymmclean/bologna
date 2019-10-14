var counter = 2 // 1
var mypi = 3 // 4
var lc = 0

/*
while (1) {
  mypi = mypi - (4 / (counter + 2)) + (4 / (counter + 4))
  counter = counter + 4
  lc = ((counter - 1) % 100000000   0)
  if (lc == 0) {
    console.log(mypi.toPrecision(50) + ' : ' + String(counter - 1).replace(/(.)(?=(\d{3})+$)/g,'$1,') )
    // 9,223,372,036,854,775,807
  }
}  */

while (1) {
    mypi = mypi + 4 / ( (counter+0) * (counter+1) * (counter+2) ) 
    mypi = mypi - 4 / ( (counter+2) * (counter+3) * (counter+4) ) 
    lc = (counter % 10)
    if (lc == 0) {
      console.log(mypi.toPrecision(50) + ' : ' + String(counter).replace(/(.)(?=(\d{3})+$)/g,'$1,') )
      // 9,223,372,036,854,775,807
    }
    counter = counter + 4
  }
  