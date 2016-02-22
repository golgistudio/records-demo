/**
 * @file Demo application for reporting fees given a record definition and orders files
 *
 * @copyright Laurie Reynolds 2016
 */

var commandLineUsage = require('command-line-usage')
var commandLineArgs = require('command-line-args')
var fs = require('fs')
var async = require('async')

import {orderManager} from '../appServer/managers/orderManager'
import {initializeRecords} from '../appServer/bootstrap/initializeRecords'
import {calculateFees} from '../appServer/calculators/calculateFees'
import {dataStoreManager} from '../shared/model/dataStoreManager'

/**
 * @function
 * @description Process the command line parameters
 * @returns {*} input options
 */
function getInputParameters () {
  const optionDefinitions = [
    {name: 'help', alias: 'h', type: Boolean, description: 'Display this usage guide'},
    {name: 'orders', type: String, multiple: false, alias: 'o',
      description: 'The input file containing orders to process.  JSON file'},
    {name: 'records', type: String, multiple: false, alias: 'r',
      description: 'The input file containing record definitions.  JSON file'}
  ]
  /* eslint-disable max-len */
  const options = {
    title: 'Report Distributions',
    description: 'Demo app to report fees from an order',
    synopsis: [
      '> node reportFees.js [bold]{-o} [underline]{file including full path} [bold]{-r} [underline]{file including full path}'
    ],
    footer: 'Github project: https://github.com/golgistudio/records-demo'
  }
  /* eslint-enable max-len */
  try {
    var inputArgs = commandLineArgs(optionDefinitions)
    var inputOptions = inputArgs.parse()

    // Check if input options are valid
    if (Object.keys(inputOptions).length === 0 || 'help' in inputOptions) {
      console.log(commandLineUsage(optionDefinitions, options))
    }

    if (!('orders' in inputOptions) || !('records' in inputOptions)) {
      console.log(commandLineUsage(optionDefinitions, options))
    }

    // check if the file exists
    fs.accessSync(inputOptions.orders, fs.R_OK)
    fs.accessSync(inputOptions.records, fs.R_OK)

    // Everything is ok - return the options
    return inputOptions
  } catch (err) {
    // Something is wrong - output the error and help message
    console.log('**************')
    console.log(err)
    console.log('**************')
    console.log(commandLineUsage(optionDefinitions, options))
  }
}

/**
 * @function
 * @description Read in the orders file and load it into memory
 * @param orderFileName
 * @param callback
 */
function initializeOrders (orderFileName, callback) {
  fs.readFile(orderFileName, 'utf8',
    function (err, data) {
      if (err) {
        throw err
      }

      var order = JSON.parse(data)
      var orderID = orderManager.getInstance().defineOrder(order)

      callback(null, orderID)
    })
}

/**
 * @function
 * @description Report the fees
 * @param orderID
 */
function reportFees (orderID) {
  var _dataStoreManager = dataStoreManager.getInstance()
  var orderCollection = _dataStoreManager.getData(orderID)

  console.log('--------------------------------------------')
  console.log('                ORDER FEES                  ')
  console.log('--------------------------------------------')

  if (orderCollection != null) {
    var orderCollectionLength = orderCollection.length

    for (var iii = 0; iii < orderCollectionLength; iii++) {
      var orderObj = orderCollection[iii]
      console.log(orderObj.date + '  -  ' + orderObj.number)
      var orderObjItemsLength = orderObj.items.length
      console.log()
      for (var jjj = 0; jjj < orderObjItemsLength; jjj++) {
        var orderItemObj = orderObj.items[jjj]

        var recordString = jjj+1 + '. ' + orderItemObj.type + ' (' + orderItemObj.pages + ') '
        var padding = 38 - recordString.length
        for (var ppp = 0; ppp < padding; ppp++) {
          recordString = recordString + '.'
        }

        recordString = recordString + ' $' + orderItemObj.fee

        console.log(recordString)
      }
      console.log(' ')
      console.log('                          Total .....  $' + orderObj.fee)
      console.log('--------------------------------------------')
    }
  }
}

/**
 * @function
 * @description Main entry point to the application
 */
function main () {
  try {
    // Process the input parameters
    // JSON file of orders
    var inputOptions = getInputParameters()

    // Use async to read in the records and orders and calculate the fees
    // Report the fees
    async.series(
      [
        function records (callback) {
          initializeRecords(inputOptions.records, callback)
        },
        function orders (callback) {
          initializeOrders(inputOptions.orders, callback)
        }
      ],
      function callback (err, results) {
        if (err) {
          console.log(err)
        } else {
          var recordID = results[0]
          var orderID = results[1]
          if (recordID !== -1 && orderID !== -1) {
            calculateFees(recordID, orderID)
            reportFees(orderID)
          } else {
            if (recordID === -1) {
              if (orderID === -1) {
                console.log('Invalid order and record definition')
              } else {
                console.log('Invalid record definition')
              }
            } else if (orderID === -1) {
              console.log('Invalid order')
            }
          }
        }
      })
  } catch (err) {
    console.log(err)
  }
}

main()
