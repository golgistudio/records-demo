/**
 * @file Bootstrap file for initializing record fees and distributions
 *
 * @copyright Laurie Reynolds 2016
 */
var fs = require('fs')
import {recordManager} from '../managers/recordManager'

/**
 * @function
 * @param callback
 * @description Read in a JSON definition and load into the datastore
 *              Returns the id of the record read in
 */
export function initializeRecords (recordDefinitionName, callback) {
  try {
    fs.readFile(recordDefinitionName, 'utf8',
      function (err, data) {
        if (err) {
          throw err
        }

        var recordDefinition = JSON.parse(data)

        var recordID = recordManager.getInstance().defineRecord(recordDefinition)

        callback(null, recordID)
      })
  } catch (err) {
    console.log(err)
  }
}
