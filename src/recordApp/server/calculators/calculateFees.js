/**
 * Created by laurie on 2/18/16.
 */

import {dataStoreManager} from '../../shared/model/dataStoreManager'

function calculateItemFee (recordID, orderType, numPages) {
  var fee = 0
  var _dataStoreManager = dataStoreManager.getInstance()
  var recordCollection = _dataStoreManager.getData(recordID)
  var recordCollectionLength = recordCollection.length
  for (var iii = 0; iii < recordCollectionLength; iii++) {
    var recordObj = recordCollection[iii]

    if (recordObj.type === orderType) {
      var recordObjFeesLength = recordObj.fees.length
      for (var jj = 0; jj < recordObjFeesLength; jj++) {
        var recordFeesObj = recordObj.fees[jj]

        if (recordFeesObj.type === 'flat') {
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

export function calculateFees (recordID, orderID) {
  var _dataStoreManager = dataStoreManager.getInstance()
  var orderCollection = _dataStoreManager.getData(orderID)
  var feesValid = true

  if (orderCollection != null) {
    var orderCollectionLength = orderCollection.length

    for (var iii = 0; iii < orderCollectionLength; iii++) {
      var totalFee = 0
      var orderObj = orderCollection[iii]

      var orderObjItemsLength = orderObj.items.length
      for (var jjj = 0; jjj < orderObjItemsLength; jjj++) {
        var orderItemObj = orderObj.items[jjj]

        var orderItemFee = calculateItemFee(recordID, orderItemObj.type, orderItemObj.pages)
        orderItemObj.fee = orderItemFee
        console.log(orderItemObj.fee)
        totalFee += orderItemFee
      }
      orderObj.fee = totalFee
      console.log(orderObj.fee)
      _dataStoreManager.setData(orderID, orderCollection)
    }
  } else {
    feesValid = false
  }
  return feesValid
}
