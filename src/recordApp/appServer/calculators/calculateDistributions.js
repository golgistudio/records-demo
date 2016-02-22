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
function calculateItemDistributions (recordID, orderType, fee) {
  var _dataStoreManager = dataStoreManager.getInstance()
  var recordCollection = _dataStoreManager.getData(recordID)

  var distributions = []
  var record = recordCollection[orderType]

  for (var key in record.distributions) {
    var recordDistribution = record.distributions[key]

    distributions[key] = recordDistribution.amount
    fee -= recordDistribution.amount
  }
  if (fee !== 0) {
    distributions[properties.otherKey] = fee
  }
  return distributions
}

function updateRunningDistributionTotals (cummulativeDistributions) {
  var _dataStoreManager = dataStoreManager.getInstance()
  var distributions = _dataStoreManager.getData(properties.distributionKey)

  if (distributions) {
    for (var key in cummulativeDistributions) {
      var value = cummulativeDistributions[key]

      // Add to the order total
      var distributionItem = distributions[key]
      if (distributionItem) {
        distributions[key] = value + distributionItem
      } else {
        distributions[key] = value
      }
    }
    _dataStoreManager.setData(properties.distributionKey, distributions)
  } else {
    _dataStoreManager.setData(properties.distributionKey, cummulativeDistributions)
  }
}

/**
 * @function
 * @description Calculate fees for an order
 * @param recordID
 * @param orderID
 * @returns {boolean}
 */
export function calculateDistributions (recordID, orderID) {
  var _dataStoreManager = dataStoreManager.getInstance()
  var orderCollection = _dataStoreManager.getData(orderID)
  var distributionsValid = true

  if (orderCollection != null) {
    var cummulativeDistributions = []

    for (var key in orderCollection) {
      var orderObj = orderCollection[key]
      var orderDistributions = []

      for (var itemKey in orderObj.items) {
        var orderItemObj = orderObj.items[itemKey]

        // Assign distributions for this order
        var itemDistributions = calculateItemDistributions(recordID, orderItemObj.type, orderItemObj.fee)

        // Accumulate distributions for the order and set of orders
        for (var distributionKey in itemDistributions) {
          var value = itemDistributions[distributionKey]

          // Add to the order total
          var distributionItem = orderDistributions[distributionKey]
          if (distributionItem) {
            orderDistributions[distributionKey] = value + distributionItem
          } else {
            orderDistributions[distributionKey] = value
          }

          // Add to the cumulative total for all orders in the collection
          distributionItem = cummulativeDistributions[distributionKey]
          if (distributionItem) {
            cummulativeDistributions[distributionKey] = value + distributionItem
          } else {
            cummulativeDistributions[distributionKey] = value
          }
        }
        orderItemObj.distributions = itemDistributions
      }
      orderObj.distributions = orderDistributions
    }
    _dataStoreManager.setData(orderID, orderCollection)
    updateRunningDistributionTotals(cummulativeDistributions)
  } else {
    distributionsValid = false
  }
  return distributionsValid
}
