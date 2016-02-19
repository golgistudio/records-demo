/**
 * @file
 */

/**
 *
 * @type {{getInstance}}
 */
export var dataStoreManager = (function () {
  'use strict'

  // Instance stores a reference to the Singleton
  var instance
  var storeCollection = []
  function init () {
    return {
      setData: function (keyId, data) {
        storeCollection[keyId] = data
      },

      getData: function (keyId) {
        var data = storeCollection[keyId]

        return data
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

