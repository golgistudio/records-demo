/** *
 *
 */

import {Record} from '../../shared/model/record/record'
import {Fee} from '../../shared/model/record/fee'
import {Distribution} from '../../shared/model/record/distribution'
import {dataStoreManager} from '../../shared/model/dataStoreManager'
import {generateUUID} from '../utils/generateUUID'

/**
 *
 * @type {{getInstance}}
 */
export var recordManager = (function () {
  'use strict'

  // Instance stores a reference to the Singleton
  var instance

  function init () {
    function validateRecord (recordCollection) {
      var isValid = true
      var recordCollectionLength = recordCollection.length
      for (var iii = 0; iii < recordCollectionLength; iii++) {
        var recordObj = recordCollection[iii]
        console.log('type: ' + recordObj.type)

        var recordObjFeesLength = recordObj.fees.length
        for (var jj = 0; jj < recordObjFeesLength; jj++) {
          var recordFeesObj = recordObj.fees[jj]
          console.log('type: ' + recordFeesObj.type)
          console.log('amount: ' + recordFeesObj.amount)
          console.log('name: ' + recordFeesObj.name)
        }

        var recordObjDistributionsLength = recordObj.distributions.length
        for (var jjj = 0; jjj < recordObjDistributionsLength; jjj++) {
          var recordDistributionsObj = recordObj.distributions[jjj]
          console.log('type: ' + recordDistributionsObj.type)
          console.log('amount: ' + recordDistributionsObj.amount)
          console.log('name: ' + recordDistributionsObj.name)
        }
        return isValid
      }
    }

    return {
      defineRecord: function (rawData) {
        console.log(rawData)

        var recordCollection = []

        var arrayLength = rawData.length
        for (var i = 0; i < arrayLength; i++) {
          var data = rawData[i]
          var _record = new Record()

          _record.type = data.order_item_type

          _record.fees = []
          var numItems = data.fees.length
          for (var j = 0; j < numItems; j++) {
            var feeItem = data.fees[j]
            var _fee = new Fee()

            if ('type' in feeItem) {
              _fee.type = feeItem.type
            } else {
              _fee.type = 'flat'
            }

            _fee.name = feeItem.name
            _fee.amount = parseInt(feeItem.amount)

            _record.fees.push(_fee)
          }

          _record.distributions = []
          numItems = data.distributions.length
          for (var jj = 0; jj < numItems; jj++) {
            var item = data.distributions[jj]
            var _distribution = new Distribution()

            if ('type' in item) {
              _distribution.type = item.type
            } else {
              _distribution.type = 'flat'
            }

            _distribution.name = item.name
            _distribution.amount = parseInt(item.amount)

            _record.distributions.push(_distribution)
          }

          recordCollection.push(_record)
        }

        var isValid = validateRecord(recordCollection)
        var collectionID = -1

        if (isValid) {
          collectionID = generateUUID()
          dataStoreManager.getInstance().setData(collectionID, recordCollection)
        }

        return collectionID
      }
    }
  }

  return {
    // Get the Singleton instance if one exists
    // or create one if it doesn't
    getInstance: function () {
      if (!instance) {
        instance = init()
      }
      return instance
    }
  }
})()
