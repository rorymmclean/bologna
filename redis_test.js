var redis = require('redis')
var client = redis.createClient()

client.on('error', function(err) {
    console.log('Error ' + err);
  });

client.on('connect', function () {
    console.log('connected')
//    client.select(1);
});

client.rpush("mykey","nodejs",function(err,reply) {
    console.log(err);
    console.log(reply);
   });

/*
client.hset("hash key1", "hashtest 1", "some value", redis.print);
client.hset(["hash key1", "hashtest 2", "some other value"], redis.print);
client.hkeys("hash key1", function (err, replies) {
    console.log(replies.length + " replies:");
    replies.forEach(function (reply, i) {
        console.log("    " + i + ": " + reply);
    });
    client.hgetall('hash key1', function(err, object) {
        console.log(object);
    });
});
*/
//client.quit()
//process.exit(1)
