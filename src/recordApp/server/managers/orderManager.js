/**
 * @file
 *
 * @copyright Laurie Reynolds 2016
 */

import {Order} from '../../shared/model/order/order'
import {OrderItem} from '../../shared/model/order/orderItem'
import {dataStoreManager} from '../../shared/model/dataStoreManager'
import {generateUUID} from '../utils/generateUUID'

/**
 *
 * @type {{getInstance}}
 */
export var orderManager = (function () {
  'use strict'

  // Instance stores a reference to the Singleton
  var instance

  function init () {
    function validateOrder (orderCollection) {
      var isValid = true

      for (var key in orderCollection) {
        var orderObj = orderCollection[key]

        var orderObjItemsLength = orderObj.items.length
        for (var jjj = 0; jjj < orderObjItemsLength; jjj++) {
          // var orderItemObj = orderObj.items[jjj]
        }
        return isValid
      }
    }

    return {
      defineOrder: function (rawData) {
        var orderCollection = []

        var arrayLength = rawData.length
        for (var i = 0; i < arrayLength; i++) {
          var data = rawData[i]
          var _order = new Order()

          _order.date = data.order_date
          _order.number = data.order_number
          _order.items = []

          var numItems = data.order_items.length
          for (var j = 0; j < numItems; j++) {
            var item = data.order_items[j]
            var _orderItem = new OrderItem()

            _orderItem.type = item.type
            _orderItem.pages = item.pages

            _order.items.push(_orderItem)
          }

          orderCollection.push(_order)
        }
        var isValid = validateOrder(orderCollection)
        var collectionID = -1

        if (isValid) {
          collectionID = generateUUID()
          dataStoreManager.getInstance().setData(collectionID, orderCollection)
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
