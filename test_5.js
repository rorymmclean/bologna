var request = require('sync-request')
var sleep = require('system-sleep')
var counter = 0

// Spreading the pain across multiple web sites //
var urls = [
  'http://worldslongestwebsite.com/',
  'https://www.yahoo.com',
  'https://www.facebook.com/',
  'https://news.google.com/?hl=en-US&gl=US&ceid=US:en',
  'https://www.foxnews.com/',
  'https://abcnews.go.com/',
  'https://www.cbsnews.com/us/',
  'https://www.nbcnews.com/',
  'https://www.washingtonpost.com/regional/',
  'https://www.washingtonexaminer.com/',
  'https://www.nytimes.com/',
  'https://www.federalregister.gov/',
  'https://www.amazon.com/',
  'https://www.ebay.com/',
  'https://www.walmart.com/',
  'https://www.walmart.com/',
  'http://worldslongestwebsite.com/'
]

function randomInt (low, high) {
  return Math.floor(Math.random() * (high - low) + low)
}

var loopSpeed = 10
if (process.env.SB_SLEEP) {
  loopSpeed = process.env.SB_SLEEP
} else if (process.env.sb_sleep) {
  loopSpeed = process.env.sb_sleep
}

while (1) {
  var unbr = randomInt(0, urls.length)
  try {
    var res = request('GET', urls[unbr])
    counter += 1
    // console.log('Reqests: '+counter+' length='+res.getBody('utf8').length)
    sleep(loopSpeed)
  } catch (err) {
    console.log(err)
    sleep(loopSpeed)
  }
}

process.exit(1)
