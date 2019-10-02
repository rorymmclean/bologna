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

![Monitoring Screen](https://github.com/rorymmclean/bologna/blob/master/public/images/Picture1.jpg "Logo Title")

>...
work-in-progress
...

## Contributing

I am not actively collaborating on this project but the public is welcome to further develop the concept.

## Authors

* **Rory McLean** - *Initial work* - [Playground](https://github.com/rorymmclean)

## License

This project is licensed under the MIT License.

