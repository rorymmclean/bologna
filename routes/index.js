var express = require('express')
var router = express.Router()
var redis = require('redis')

var os = require('os')
var testhost = os.hostname()
var data1 = ''
var data2 = ''
var data3 = ''
var data4 = ''
var data5 = ''
var data6 = ''
var data7 = ''
var data8 = ''
var spinner1 = 'visible'
var spinner2 = 'visible'
var spinner3 = 'visible'
var spinner4 = 'visible'
var spinner5 = 'visible'
var spinner6 = 'visible'
var spinner7 = 'visible'
var spinner8 = 'visible'
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
  var metrics1 = 'None'
}
if (typeof metrics2 == 'undefined') {
  var metrics2 = 'None'
}
if (typeof metrics3 == 'undefined') {
  var metrics3 = 'None'
}
if (typeof metrics4 == 'undefined') {
  var metrics4 = 'None'
}
if (typeof metrics5 == 'undefined') {
  var metrics5 = 'None'
}
if (typeof metrics6 == 'undefined') {
  var metrics6 = 'None'
}
if (typeof metrics7 == 'undefined') {
  var metrics7 = 'None'
}
if (typeof metrics8 == 'undefined') {
  var metrics8 = 'None'
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
if (typeof serverlist4 == 'undefined') {
  var serverlist4 = ''
}
if (typeof serverlist5 == 'undefined') {
  var serverlist5 = ''
}
if (typeof serverlist6 == 'undefined') {
  var serverlist6 = ''
}
if (typeof serverlist7 == 'undefined') {
  var serverlist7 = ''
}
if (typeof serverlist8 == 'undefined') {
  var serverlist8 = ''
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
if (typeof server4 == 'undefined') {
  var server4 = 'L-'+testhost
}
if (typeof server5 == 'undefined') {
  var server5 = 'L-'+testhost
}
if (typeof server6 == 'undefined') {
  var server6 = 'L-'+testhost
}
if (typeof server7 == 'undefined') {
  var server7 = 'L-'+testhost
}
if (typeof server8 == 'undefined') {
  var server8 = 'L-'+testhost
}

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
  serverlist4t = ''
  serverlist5t = ''
  serverlist6t = ''
  serverlist7t = ''
  serverlist8t = ''
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
    if (reply == server4) {
      serverlist4t += '<option value="'+reply+'" selected>'+reply.substr(2, 999)+'</option>\n'
    } else {
      serverlist4t += '<option value="'+reply+'" >'+reply.substr(2, 999)+'</option>\n'
    }
    if (reply == server5) {
      serverlist5t += '<option value="'+reply+'" selected>'+reply.substr(2, 999)+'</option>\n'
    } else {
      serverlist5t += '<option value="'+reply+'" >'+reply.substr(2, 999)+'</option>\n'
    }
    if (reply == server6) {
      serverlist6t += '<option value="'+reply+'" selected>'+reply.substr(2, 999)+'</option>\n'
    } else {
      serverlist6t += '<option value="'+reply+'" >'+reply.substr(2, 999)+'</option>\n'
    }
    if (reply == server7) {
      serverlist7t += '<option value="'+reply+'" selected>'+reply.substr(2, 999)+'</option>\n'
    } else {
      serverlist7t += '<option value="'+reply+'" >'+reply.substr(2, 999)+'</option>\n'
    }
    if (reply == server8) {
      serverlist8t += '<option value="'+reply+'" selected>'+reply.substr(2, 999)+'</option>\n'
    } else {
      serverlist8t += '<option value="'+reply+'" >'+reply.substr(2, 999)+'</option>\n'
    }
    if (reply == server8) {
      serverlist8t += '<option value="'+reply+'" selected>'+reply.substr(2, 999)+'</option>\n'
    } else {
      serverlist8t += '<option value="'+reply+'" >'+reply.substr(2, 999)+'</option>\n'
    }
  });
  serverlist1 = serverlist1t
  serverlist2 = serverlist2t
  serverlist3 = serverlist3t
  serverlist4 = serverlist4t
  serverlist5 = serverlist5t
  serverlist6 = serverlist6t
  serverlist7 = serverlist7t
  serverlist8 = serverlist8t
})


/* GET home page. */
router.get('/', function (req, res) {
  serverlist1t = ''
  serverlist2t = ''
  serverlist3t = ''
  serverlist4t = ''
  serverlist5t = ''
  serverlist6t = ''
  serverlist7t = ''
  serverlist8t = ''
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
      if (reply == server4) {
        serverlist4t += '<option value="'+reply+'" selected>'+reply.substr(2, 999)+'</option>\n'
      } else {
        serverlist4t += '<option value="'+reply+'" >'+reply.substr(2, 999)+'</option>\n'
      }
      if (reply == server5) {
        serverlist5t += '<option value="'+reply+'" selected>'+reply.substr(2, 999)+'</option>\n'
      } else {
        serverlist5t += '<option value="'+reply+'" >'+reply.substr(2, 999)+'</option>\n'
      }
      if (reply == server6) {
        serverlist6t += '<option value="'+reply+'" selected>'+reply.substr(2, 999)+'</option>\n'
      } else {
        serverlist6t += '<option value="'+reply+'" >'+reply.substr(2, 999)+'</option>\n'
      }
      if (reply == server7) {
        serverlist7t += '<option value="'+reply+'" selected>'+reply.substr(2, 999)+'</option>\n'
      } else {
        serverlist7t += '<option value="'+reply+'" >'+reply.substr(2, 999)+'</option>\n'
      }
      if (reply == server8) {
        serverlist8t += '<option value="'+reply+'" selected>'+reply.substr(2, 999)+'</option>\n'
      } else {
        serverlist8t += '<option value="'+reply+'" >'+reply.substr(2, 999)+'</option>\n'
      }
      if (reply == server8) {
        serverlist8t += '<option value="'+reply+'" selected>'+reply.substr(2, 999)+'</option>\n'
      } else {
        serverlist8t += '<option value="'+reply+'" >'+reply.substr(2, 999)+'</option>\n'
      }
    });
    serverlist1 = serverlist1t
    serverlist2 = serverlist2t
    serverlist3 = serverlist3t
    serverlist4 = serverlist4t
    serverlist5 = serverlist5t
    serverlist6 = serverlist6t
    serverlist7 = serverlist7t
    serverlist8 = serverlist8t
  })
  if (metrics1 == 'None') {
    data1 = ''
    spinner1 = 'invisible'
  } else {
  client.lrange(server1, -dpts, -1, function(err, reply) {
    data1 = ''
    reply.forEach (function (key,pos) {
      client.hget(server1.substr(2, 999)+':'+key,metrics1, function(err, reply) {
        data1 = data1 + '{ ts: '+key+', metric: '+reply+' },\n'
      })
    })
    spinner1 = 'invisible'
  })
  }
  if (metrics2 == 'None') {
    data2 = ''
    spinner2 = 'invisible'
  } else {
    client.lrange(server2, -dpts, -1, function(err, reply) {
      data2 = ''
      reply.forEach (function (key,pos) {
        client.hget(server2.substr(2, 999)+':'+key,metrics2, function(err, reply) {
          data2 = data2 + '{ ts: '+key+', metric: '+reply+' },\n'
        })
      })
      spinner2 = 'invisible'
    })
  }
  if (metrics3 == 'None') {
    data3 = ''
    spinner3 = 'invisible'
  } else {
    client.lrange(server3, -dpts, -1, function(err, reply) {
      data3 = ''
      reply.forEach (function (key,pos) {
        client.hget(server3.substr(2, 999)+':'+key,metrics3, function(err, reply) {
          data3 = data3 + '{ ts: '+key+', metric: '+reply+' },\n'
        })
      })
      spinner3 = 'invisible'
    })
  }
  if (metrics4 == 'None') {
    data4 = ''
    spinner4 = 'invisible'
  } else {
    client.lrange(server4, -dpts, -1, function(err, reply) {
      data4 = ''
      reply.forEach (function (key,pos) {
        client.hget(server4.substr(2, 999)+':'+key,metrics4, function(err, reply) {
          data4 = data4 + '{ ts: '+key+', metric: '+reply+' },\n'
        })
      })
      spinner4 = 'invisible'
    })
  }
  if (metrics5 == 'None') {
    data5 = ''
    spinner5 = 'invisible'
  } else {
    client.lrange(server5, -dpts, -1, function(err, reply) {
      data5 = ''
      reply.forEach (function (key,pos) {
        client.hget(server5.substr(2, 999)+':'+key,metrics5, function(err, reply) {
          data5 = data5 + '{ ts: '+key+', metric: '+reply+' },\n'
        })
      })
      spinner5 = 'invisible'
    })
  }
  if (metrics6 == 'None') {
    data6 = ''
    spinner6 = 'invisible'
  } else {
    client.lrange(server6, -dpts, -1, function(err, reply) {
      data6 = ''
      reply.forEach (function (key,pos) {
        client.hget(server6.substr(2, 999)+':'+key,metrics6, function(err, reply) {
          data6 = data6 + '{ ts: '+key+', metric: '+reply+' },\n'
        })
      })
      spinner6 = 'invisible'
    })
  }
  if (metrics7 == 'None') {
    data7 = ''
    spinner7 = 'invisible'
  } else {
    client.lrange(server7, -dpts, -1, function(err, reply) {
      data7 = ''
      reply.forEach (function (key,pos) {
        client.hget(server7.substr(2, 999)+':'+key,metrics7, function(err, reply) {
          data7 = data7 + '{ ts: '+key+', metric: '+reply+' },\n'
        })
      })
      spinner7 = 'invisible'
    })
  }
  if (metrics8 == 'None') {
    data8 = ''
    spinner8 = 'invisible'
  } else {
    client.lrange(server8, -dpts, -1, function(err, reply) {
      data8 = ''
      reply.forEach (function (key,pos) {
        client.hget(server8.substr(2, 999)+':'+key,metrics8, function(err, reply) {
          data8 = data8 + '{ ts: '+key+', metric: '+reply+' },\n'
        })
      })
      spinner8 = 'invisible'
    })
  }
  if ((spinner1 == 'visible') || (spinner2 == 'visible') || 
      (spinner3 == 'visible') || (spinner4 == 'visible') ||
      (spinner5 == 'visible') || (spinner6 == 'visible') ||
      (spinner7 == 'visible') || (spinner8 == 'visible')) {
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
     pdata4: data4,
     pdata5: data5,
     pdata6: data6,
     pdata7: data7,
     pdata8: data8,
     serverlist1: serverlist1,
     serverlist2: serverlist2,
     serverlist3: serverlist3,
     serverlist4: serverlist4,
     serverlist5: serverlist5,
     serverlist6: serverlist6,
     serverlist7: serverlist7,
     serverlist8: serverlist8,
     server1: server1,
     metric1: metrics1,
     server2: server2,
     metric2: metrics2,
     server3: server3,
     metric3: metrics3,
     server4: server4,
     metric4: metrics4,
     server5: server5,
     metric5: metrics5,
     server6: server6,
     metric6: metrics6,
     server7: server7,
     metric7: metrics7,
     server8: server8,
     metric8: metrics8,
     spinner1: spinner1,
     spinner2: spinner2,
     spinner3: spinner3,
     spinner4: spinner4,
     spinner5: spinner5,
     spinner6: spinner6,
     spinner7: spinner7,
     spinner8: spinner8,
     myrefresh: myrefresh,
     winternet: winternet
   })
   serverlist1 = ''
   serverlist2 = ''
   serverlist3 = '' 
   serverlist4 = '' 
   serverlist5 = '' 
   serverlist6 = '' 
   serverlist7 = '' 
   serverlist8 = '' 
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
    spinner4 = 'visible'
    spinner5 = 'visible'
    spinner6 = 'visible'
    spinner7 = 'visible'
    spinner8 = 'visible'
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
  if (typeof req.body.metric4 !== 'undefined') {
    metrics4 = req.body.metric4
    spinner4 = 'visible'
  }
  if (typeof req.body.metric5 !== 'undefined') {
    metrics5 = req.body.metric5
    spinner5 = 'visible'
  }
  if (typeof req.body.metric6 !== 'undefined') {
    metrics6 = req.body.metric6
    spinner6 = 'visible'
  }
  if (typeof req.body.metric7 !== 'undefined') {
    metrics7 = req.body.metric7
    spinner7 = 'visible'
  }
  if (typeof req.body.metric8 !== 'undefined') {
    metrics8 = req.body.metric8
    spinner8 = 'visible'
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
  if (typeof req.body.server4 !== 'undefined') {
    server4 = req.body.server4
    spinner4 = 'visible'
  }
  if (typeof req.body.server5 !== 'undefined') {
    server5 = req.body.server5
    spinner5 = 'visible'
  }
  if (typeof req.body.server6 !== 'undefined') {
    server6 = req.body.server6
    spinner6 = 'visible'
  }
  if (typeof req.body.server7 !== 'undefined') {
    server7 = req.body.server7
    spinner7 = 'visible'
  }
  if (typeof req.body.server8 !== 'undefined') {
    server8 = req.body.server8
    spinner8 = 'visible'
  }
  res.redirect('/')
})

module.exports = router
