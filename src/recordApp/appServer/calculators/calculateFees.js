/**
 * @file Given an order id and record id, retrieve the items and calculate the fees
 *
 * @copyright Laurie Reynolds 2016
 */

import {dataStoreManager} from '../../shared/model/dataStoreManager'
import {properties} from '../utils/properties'

/**
 * @function
 * @description Calculate the fee for an item
 * @param recordID
 * @param orderType
 * @param numPages
 * @returns {number}
 */
function calculateItemFee (recordID, orderType, numPages) {
  var fee = 0
  var _dataStoreManager = dataStoreManager.getInstance()
  var recordCollection = _dataStoreManager.getData(recordID)

  for (var key in recordCollection) {
    var recordObj = recordCollection[key]

    if (recordObj.type === orderType) {
      for (var feeskey in recordObj.fees) {
        var recordFeesObj = recordObj.fees[feeskey]

        if (recordFeesObj.type === properties.flat) {
          fee += recordFeesObj.amount
        } else {
          if (numPages > 1) {
            fee += ((numPages - 1) * recordFeesObj.amount)
          }
        }
      }
    }
  }
  return fee
}

/**
 * @function
 * @description Calculate fees for an order
 * @param recordID
 * @param orderID
 * @returns {boolean}
 */
export function calculateFees (recordID, orderID) {
  var _dataStoreManager = dataStoreManager.getInstance()
  var orderCollection = _dataStoreManager.getData(orderID)
  var feesValid = true

  if (orderCollection != null) {
    for (var key in orderCollection) {
      var totalFee = 0
      var orderObj = orderCollection[key]

      for (var itemKey in orderObj.items) {
        var orderItemObj = orderObj.items[itemKey]

        var orderItemFee = calculateItemFee(recordID, orderItemObj.type, orderItemObj.pages)
        orderItemObj.fee = orderItemFee
        totalFee += orderItemFee
      }
      orderObj.fee = totalFee
      _dataStoreManager.setData(orderID, orderCollection)
    }
  } else {
    feesValid = false
  }
  return feesValid
}
