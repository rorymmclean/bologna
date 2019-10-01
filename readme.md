# Sliced Bologna

"Sliced Bologna" is a Node.js application for stress testing servers and networks.

### Synopsis

"Sliced Bologna" was initially developed so I could stress a SAN system. Since there was no way one server could stress the SAN, I developed this tool to run on multiple boxes so a sufficient load could be built up. 

### Prerequisites

The tool was designed on a Mac but designed for Linux. It has not been tested on a Windows platform.

You will need to have Node and NPM installed on the server prior to installing. 

You should also have IOSTAT installed on your Linux box. You can collect statistics without IOSTAT but the stats are more limited. 

The applicaiton depends upon Redis to store metrics. On one of your designated servers I recommend you install Docker and run the latest release of Redis. 

### Installing

With Node, NPM, IOSTAT, and Docker installed, download a copy of this repository. Unzip if you downloaded the zip version.

Make a directory in your home directory called TESTMNT. You can use the command:
`mkdir ~/TESTMNT`

In the project directory run `npm install` to install all the packages.

### Operations

There are several configurations based upon environmental variables:
...
...

### Contributing

I am not actively collaborating on this project but the public is welcome to further develop the concept.


### Authors

* **Rory McLean** - *Initial work* - [Playground](https://github.com/rorymmclean)

### License

This project is licensed under the MIT License.

