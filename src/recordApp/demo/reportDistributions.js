/**
 *
 */

var commandLineUsage = require('command-line-usage')
var commandLineArgs = require('command-line-args')

const optionDefinitions = [
  { name: 'help', alias: 'h', type: Boolean, description: 'Display this usage guide' },
  { name: 'orders', type: String, multiple: false, alias: 'o', defaultOption: true,
          description: 'The input file containing orders to process.  JSON file'}
]

const options = {
  title: 'Report Distributions',
  description: 'Demo app to report distributions from an order',
  synopsis: [
    '> node reportDistributions.js [bold]{-o} [underline]{file including full path}'
  ],
  footer: 'Github project: https://github.com/golgistudio/records-demo'
}

try {
  var inputArgs = commandLineArgs(optionDefinitions)
  var inputOptions = inputArgs.parse()
  if (Object.keys(inputOptions).length === 0 || 'help' in inputOptions || !('orders' in inputOptions)) {
    console.log(commandLineUsage(optionDefinitions, options))
  }

  console.log(inputOptions)

  var fs = require('fs')
  var order

  fs.readFile(inputOptions['orders'], 'utf8',
    function (err, data) {
      if (err) {
        throw err
      }

      order = JSON.parse(data)
      console.log(order)
    })

  var recordDefinition

  fs.readFile('../shared/data/fees.json', 'utf8',
    function (err, data) {
      if (err) {
        throw err
      }

      recordDefinition = JSON.parse(data)
      console.log(recordDefinition)
    })
} catch (err) {
  console.log(commandLineUsage(optionDefinitions, options))
}
