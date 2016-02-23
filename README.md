[![Build Status](https://travis-ci.org/golgistudio/records-demo.svg?branch=master)](https://travis-ci.org/golgistudio/records-demo)
[![Stack Share](http://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](http://stackshare.io/golgistudio/golgistudio)
[![dependencies](https://david-dm.org/golgistudio/records-demo.svg)](https://david-dm.org/golgistudio/records-demo)
[![devDependency Status](https://david-dm.org/golgistudio/records-demo/dev-status.svg)](https://david-dm.org/golgistudio/records-demo#info=devDependencies)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![github-version](https://badge.fury.io/gh/golgistudio%2Frecords-demo.svg)](http://badge.fury.io)


Simple Demo of Records Calculations
====================================

* [JSDoc](http://golgistudio.github.io/records-demo/quality/docs/records-demo/0.0.1/)
* [Coverage Report](http://golgistudio.github.io/records-demo/quality/coverage/PhantomJS%202.1.1%20(Linux%200.0.0)/lcov-report/index.html)

<img src="https://raw.githubusercontent.com/golgistudio/records-demo/gh-pages/images/recordDemo.png" alt="Records Demo screenshot" width="400">


## Table of contents

  * [Table of contents](#table-of-contents)
  * [Overview](#overview)
  * [Getting Started](#getting-started)
  * [Running the application](#running-the-application)
  * [Design Notes](#design-notes)


## Overview 
This a a simple demo of a records calculator using node and redux.  Given a records definition and order set, be able to calculate the fees and distributions for the order.

It is written using node and redux.   The starting point is Dave Zuko's great react redux starter kit - [Github Repo](https://github.com/davezuko/react-redux-starter-kit)

The source is in the src/recordApp folder

* appServer - Application server accessed through rest apis to set an order and calculate fees and distributions
* client - Barebones react web page (see above screenshot)
* demo - Command line tools for calculating the fees and distributions
* server - Koa web server with hot reload (unchanced from the starter kit)
* shared - Common models 
* tests - A few unit tests - see above link to the code coverage

See the package.json for the packages used.   Additional packages included beyond the starter kit are:

* async - Used in the command line app to run wrap async operations
  * (github repo)[https://github.com/caolan/async]
* axios - Used in the client application to make http calls
  * (github repo)[https://github.com/mzabriskie/axios]
* validate.js - Used to validate the records file
  * (website)[https://validatejs.org/]

## Running the Application

Download and install the necessary node modules.  

```bash
git clone https://github.com/golgistudio/records-demo.git
cd records-demo
npm install
```

To run the command line demo for calculating fees.  The bash shell script includes references to the input files and calls a wrapper script that compiles the ES6 code.

```bash
cd src/recordApp/demo
./runReportFees.sh
```
To run the command line demo for calculating distributions.   The bash shell script includes references to the input files and calls a wrapper script that compiles the ES6 code.
```bash
cd src/recordApp/demo
./runReportDistributions.sh
```

To run the tests. This outputs a coverage report in the quality folder
```bash
cd records-demo
npm run testse
```
 
To run the demo.  Start the application server and then the web server
The express app server runs on port 3001

```bash
cd records-demo
npm run startAppServer
```

The web app server runs on port 3000
```bash
cd records-demo
npm run start
```
