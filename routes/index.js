var express = require('express')
var router = express.Router()
var redis = require('redis')

var os = require('os')
var testhost = os.hostname()
var data1 = ''
var data2 = ''
var data3 = ''

if (typeof drf == 'undefined') {
  drf = 10
}
if (typeof dpts == 'undefined') {
  dpts = 100
}
if (typeof metrics1 == 'undefined') {
  metrics1 = 'MemF'
}
if (typeof metrics2 == 'undefined') {
  metrics2 = 'MemF'
}
if (typeof metrics3 == 'undefined') {
  metrics3 = 'MemF'
}

var redisPort = 6379
if (process.env.SB_PORT) {
  redisPort = process.env.SB_PORT
} else if (process.env.sb_port) {
  redisPort = process.env.sb_port
}

var redisIP = '127.0.0.1'
if (process.env.SB_IP) {
  redisIP = process.env.IP
} else if (process.env.sb_ip) {
  redisIP = process.env.ip
}

console.log(redisPort)
console.log(redisIP)

var client = redis.createClient(redisPort, redisIP)

client.on('error', function (err) {
  console.log('Error ' + err)
})

client.on('connect', function () {
  console.log('connected to ' + redisIP + ':' + redisPort)
})

/* GET home page. */
router.get('/', function(req, res, next) {
  client.lrange('L-Rorys-MacBook-Pro.local', -200, -1, function(err, reply) {
    data1 = ''
    reply.forEach (function (key,pos) {
      client.hget('Rorys-MacBook-Pro.local:'+key,'LoadU', function(err, reply) {
        data1 = data1 + '{ ts: '+key+', metric: '+reply+' },\n'
      })
    })
  })
  res.render('index', {
    page:'Home', 
    menuId:'home',
    pdata1: data1
  })
})
router.post('/', function(req, res, next) {
  res.render('index', {
    page:'Home', 
    menuId:'home'
  })
})

/* GET Hello World page. */
router.get('/helloworld', function (req, res) {
  client.lrange('L-Rorys-MacBook-Pro.local', -dpts, -1, function(err, reply) {
    data1 = ''
    reply.forEach (function (key,pos) {
      client.hget('Rorys-MacBook-Pro.local:'+key,metrics1, function(err, reply) {
        data1 = data1 + '{ ts: '+key+', metric: '+reply+' },\n'
      })
    })
  })
  client.lrange('L-Rorys-MacBook-Pro.local', -dpts, -1, function(err, reply) {
    data2 = ''
    reply.forEach (function (key,pos) {
      client.hget('Rorys-MacBook-Pro.local:'+key,metrics2, function(err, reply) {
        data2 = data2 + '{ ts: '+key+', metric: '+reply+' },\n'
      })
    })
  })
  client.lrange('L-Rorys-MacBook-Pro.local', -dpts, -1, function(err, reply) {
    data3 = ''
    reply.forEach (function (key,pos) {
      client.hget('Rorys-MacBook-Pro.local:'+key,metrics3, function(err, reply) {
        data3 = data3 + '{ ts: '+key+', metric: '+reply+' },\n'
      })
    })
  })
  res.render('helloworld', {
    page:'Home', 
    menuId:'home',
     drfvalue: drf,
     datapoints: dpts,
     pdata1: data1,
     pdata2: data2,
     pdata3: data3,
     server1: 'Rorys-MacBook-Pro.local',
     metric1: metrics1,
     server2: 'Rorys-MacBook-Pro.local',
     metric2: metrics2,
     server3: 'Rorys-MacBook-Pro.local',
     metric3: metrics3
   })
})

router.post('/helloworld', function (req, res) {
  if (typeof req.body.frddl !== 'undefined') {
    drf = req.body.frddl
  }
  if (typeof req.body.datapoints !== 'undefined') {
    dpts = req.body.datapoints
  }
  if (typeof req.body.metric1 !== 'undefined') {
    metrics1 = req.body.metric1
  }
  if (typeof req.body.metric2 !== 'undefined') {
    metrics2 = req.body.metric2
  }
  if (typeof req.body.metric3 !== 'undefined') {
    metrics3 = req.body.metric3
  }
  res.redirect('/helloworld');
})

module.exports = router
