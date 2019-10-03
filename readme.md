# Sliced Bologna

"Sliced Bologna" is a Node.js application for stress testing servers and networks.

## Synopsis

"Sliced Bologna" was initially developed so I could stress a SAN system. Since there was no way one server could stress the SAN, I developed this tool to run on multiple boxes so a sufficient load could be built up. 

## Prerequisites

The tool was designed on a Mac but designed for Linux. It has not been tested on a Windows platform.

You will need to have Node and NPM installed on the server prior to installing. 

You should also have IOSTAT installed on your Linux box. You can collect statistics without IOSTAT but the stats are more limited. 

The applicaiton depends upon Redis to store metrics. On one of your designated servers I recommend you install Docker and run the latest release of Redis. 

## Installing

With Node, NPM, IOSTAT, and Docker installed, download a copy of this repository. Unzip if you downloaded the zip version.

Make a directory in your home directory called TESTMNT. You can use the command:
`mkdir ~/TESTMNT`

In the project directory run `npm install` to install all the packages.

## Operations

The application is controlled through several environmental variables. The first step is to start Redis on one of the servers. We are not using any authentication since none of the data is particularly sensitive 
`docker run --name redisdb -p 6379:6379 redis:latest`
should be sufficient to give you a Redis database. Note the IP address and the port if you changed off the default port. 

For every server that will be running the app should have two environmental variables set:
**SB_IP** is the Redis IP address address. If not set it will default to localhost.
**SB_PORT** is the Redis port address. If not set it will default to 6379

On each server you must run a stats collecting program. There are two alternatives. *stats_linux.js* uses the Linux tool IOSTAT to collect metrics. You may have to install IOSTAT on your Linus server before you start. *stats.js* collects metrics using the node module *systeminformation* and will work on other platforms.

From within the project folder run the following command:
`node stats.js &` or `node stats_linux.js &`
The & will run the job in the background and return to the os prompt. The stats collector will capture all the data points every 10 seconds. 

Next, run the express web app with the following command:
`npm start`
This will start the web application hosted on port 3000:
http://localhost:3000

At this point no agents (bolony slices) are running so the only metrics being collected is from other comptuer activity.

![Monitoring Screen](https://raw.githubusercontent.com/rorymmclean/bologna/master/public/images/Picture1.jpg "Monitoring Screen")

The monitoring screen has several settings:
1. Screen refresh rate: This can range from 10 seconds to an hour or no refreshes at all.
2. Number of data points: The number of data points displaying in the graph. It is always the most recent data points. 
3. The server that generated the metrics. The stats collector uses the host name for the metrics. I assume each server has a unique host name. 
4. The metrics for the graph. stats.js collects the metrics from "IORx" down to "MemF". stats_linux.js collects all the metrics that begin with "Disk..." plus the four CPU load metrics. 

To launch bolony slices click on the "Slices" link in the menu bar. 

![Agents Screen](https://raw.githubusercontent.com/rorymmclean/bologna/master/public/images/Picture2.jpg "Agents Screen")

On this screen click the up and down arrows to add and remove agents. The tests have been designed to duplicate certain patterns but can be combined any way you wish. 
1. Slice #1 is a pattern a database tends to generate. I find that 5 or 6 of these slices is enough to flood my laptops IO bandwidth. 
2. Slice #2 is a lot of small read and writes. Unlike #1, the writes aren't cached. 
3. Slice #3 creates a 1GB file and then reads it like the server is providing streaming media. 
4. Slice #4 has no CPU. It consumes the CPU with an algorithm for calculating PI. 
5. Slice #5 randomly hits a variety of web sites to consume the network bandwidth. 

Files created during the testing process are stored by default in the *~/TESTMNT* directory. This can be overridden by the environmental variable **SB_PATH**. Set this value to the target directory ending with a final "/" such as `export SB_PATH=/volumes/flashdrive/`

Tests #1, #2, and #5 add a sleep command between each loop. This defaults to 10ms. I don't recommend reducing this since you can always add more slices to increase load, but if even one load is more than you want to create you can set the environmental variable **SB_SLEEP** to some value greater than 10.

## Clean up

To kill the stats collector find the PID using the command `ps | grep node` and `kill `*pid#*` `

If you want to clean up your Redis database you can remove the docker container or run a Redis IDE like redis-commander. 

You will need to clean up your target directory ("*~/TESTMNT*" or your custom setting) manually.

## Contributing

I am not actively collaborating on this project but the public is welcome to further develop the concept.

## Authors

* **Rory McLean** - *Initial work* - [Playground](https://github.com/rorymmclean)

## License

This project is licensed under the MIT License.

