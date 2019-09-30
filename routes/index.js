var express = require('express')
var router = express.Router()
var redis = require('redis')

var os = require('os')
var testhost = os.hostname()
var data1 = ''
var data2 = ''
var data3 = ''
var spinner1 = 'visible'
var spinner2 = 'visible'
var spinner3 = 'visible'
var myrefresh = 1
var winternet = -1

var d3test = require('http');
d3test.get ('http://www.google.com', function (resp) {
  resp.on('data', function (d) {
    winternet = 1
  })
}).on('error', function (e) {
  winternet = -1
})

if (typeof drf == 'undefined') {
  var drf = 99999999
}
if (typeof dpts == 'undefined') {
  var dpts = 100
}
if (typeof metrics1 == 'undefined') {
  var metrics1 = 'MemF'
}
if (typeof metrics2 == 'undefined') {
  var metrics2 = 'MemF'
}
if (typeof metrics3 == 'undefined') {
  var metrics3 = 'MemF'
}
if (typeof serverlist1 == 'undefined') {
  var serverlist1 = ''
}
if (typeof serverlist2 == 'undefined') {
  var serverlist2 = ''
}
if (typeof serverlist3 == 'undefined') {
  var serverlist3 = ''
}
if (typeof server1 == 'undefined') {
  var server1 = 'L-'+testhost
}
if (typeof server2 == 'undefined') {
  var server2 = 'L-'+testhost
}
if (typeof server3 == 'undefined') {
  var server3 = 'L-'+testhost
}
serverlist1 = ''
serverlist2 = ''
serverlist3 = ''

var redisPort = 6379
if (process.env.SB_PORT) {
  redisPort = process.env.SB_PORT
} else if (process.env.sb_port) {
  redisPort = process.env.sb_port
}

var redisIP = '127.0.0.1'
if (process.env.SB_IP) {
  redisIP = process.env.SB_IP
} else if (process.env.sb_ip) {
  redisIP = process.env.sb_ip
}

console.log(redisPort)
console.log(redisIP)

var client = redis.createClient(redisPort, redisIP)

client.on('error', function (err) {
  console.log('Error ' + err)
})

client.on('connect', function () {
  console.log('connected to ' + redisIP + ':' + redisPort)
});  

client.keys('L-*', function (err, replies) {
  serverlist1t = ''
  serverlist2t = ''
  serverlist3t = ''
  replies.forEach(function (reply, i) {
    if (reply == server1) {
      serverlist1t += '<option value="'+reply+'" selected>'+reply.substr(2, 999)+'</option>\n'
    } else {
      serverlist1t += '<option value="'+reply+'" >'+reply.substr(2, 999)+'</option>\n'
    }
    if (reply == server2) {
      serverlist2t += '<option value="'+reply+'" selected>'+reply.substr(2, 999)+'</option>\n'
    } else {
      serverlist2t += '<option value="'+reply+'" >'+reply.substr(2, 999)+'</option>\n'
    }
    if (reply == server3) {
      serverlist3t += '<option value="'+reply+'" selected>'+reply.substr(2, 999)+'</option>\n'
    } else {
      serverlist3t += '<option value="'+reply+'" >'+reply.substr(2, 999)+'</option>\n'
    }
  });
  serverlist1 = serverlist1t
  serverlist2 = serverlist2t
  serverlist3 = serverlist3t
})


/* GET home page. */
router.get('/', function (req, res) {
  serverlist1t = ''
  serverlist2t = ''
  serverlist3t = ''
  client.keys('L-*', function (err, replies) {
    replies.forEach(function (reply, i) {
      if (reply == server1) {
        serverlist1t += '<option value="'+reply+'" selected>'+reply.substr(2, 999)+'</option>\n'
      } else {
        serverlist1t += '<option value="'+reply+'" >'+reply.substr(2, 999)+'</option>\n'
      }
      if (reply == server2) {
        serverlist2t += '<option value="'+reply+'" selected>'+reply.substr(2, 999)+'</option>\n'
      } else {
        serverlist2t += '<option value="'+reply+'" >'+reply.substr(2, 999)+'</option>\n'
      }
      if (reply == server3) {
        serverlist3t += '<option value="'+reply+'" selected>'+reply.substr(2, 999)+'</option>\n'
      } else {
        serverlist3t += '<option value="'+reply+'" >'+reply.substr(2, 999)+'</option>\n'
      }
    });
    serverlist1 = serverlist1t
    serverlist2 = serverlist2t
    serverlist3 = serverlist3t
  })
  client.lrange(server1, -dpts, -1, function(err, reply) {
    data1 = ''
    reply.forEach (function (key,pos) {
      client.hget(server1.substr(2, 999)+':'+key,metrics1, function(err, reply) {
        data1 = data1 + '{ ts: '+key+', metric: '+reply+' },\n'
      })
    })
    spinner1 = 'invisible'
  })
  client.lrange(server2, -dpts, -1, function(err, reply) {
    data2 = ''
    reply.forEach (function (key,pos) {
      client.hget(server2.substr(2, 999)+':'+key,metrics2, function(err, reply) {
        data2 = data2 + '{ ts: '+key+', metric: '+reply+' },\n'
      })
    })
    spinner2 = 'invisible'
  })
  client.lrange(server3, -dpts, -1, function(err, reply) {
    data3 = ''
    reply.forEach (function (key,pos) {
      client.hget(server3.substr(2, 999)+':'+key,metrics3, function(err, reply) {
        data3 = data3 + '{ ts: '+key+', metric: '+reply+' },\n'
      })
    })
    spinner3 = 'invisible'
  })
  if ((spinner1 == 'visible') || (spinner2 == 'visible') || (spinner3 == 'visible')) {
    myrefresh = .5 
  } else {
    myrefresh = drf
  }
  res.render('index', {
    page:'Home', 
    menuId:'home',
     drfvalue: drf,
     datapoints: dpts,
     pdata1: data1,
     pdata2: data2,
     pdata3: data3,
     serverlist1: serverlist1,
     serverlist2: serverlist2,
     serverlist3: serverlist3,
     server1: server1,
     metric1: metrics1,
     server2: server2,
     metric2: metrics2,
     server3: server3,
     metric3: metrics3,
     spinner1: spinner1,
     spinner2: spinner2,
     spinner3: spinner3,
     myrefresh: myrefresh,
     winternet: winternet
   })
   serverlist1 = ''
   serverlist2 = ''
   serverlist3 = '' 
})

router.post('/', function (req, res) {
  if (typeof req.body.frddl !== 'undefined') {
    drf = req.body.frddl
  }
  if (typeof req.body.datapoints !== 'undefined') {
    dpts = req.body.datapoints
    spinner1 = 'visible'
    spinner2 = 'visible'
    spinner3 = 'visible'
  }
  if (typeof req.body.metric1 !== 'undefined') {
    metrics1 = req.body.metric1
    spinner1 = 'visible'
  }
  if (typeof req.body.metric2 !== 'undefined') {
    metrics2 = req.body.metric2
    spinner2 = 'visible'
  }
  if (typeof req.body.metric3 !== 'undefined') {
    metrics3 = req.body.metric3
    spinner3 = 'visible'
  }
  if (typeof req.body.server1 !== 'undefined') {
    server1 = req.body.server1
    spinner1 = 'visible'
  }
  if (typeof req.body.server2 !== 'undefined') {
    server2 = req.body.server2
    spinner2 = 'visible'
  }
  if (typeof req.body.server3 !== 'undefined') {
    server3 = req.body.server3
    spinner3 = 'visible'
  }
  res.redirect('/')
})

module.exports = router
