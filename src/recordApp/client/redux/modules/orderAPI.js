import axios from 'axios'

import {orderList} from './orderData'

var serverStatus = 'Not Ready'
var results = ''

export function fees (callback) {
  results = ''
  return (async function callFees (dispatch) {
    const url='http://localhost:3001/fees'
    try {
      var response = await axios.get(url)
      var parsed = JSON.parse(response.data)
      results = JSON.stringify(parsed, null, '\t')
      callback(results)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  })()
}

export function distributions (callback) {
  results = ''
  return (async function callDistributions (dispatch) {
    const url='http://localhost:3001/distributions'
    try {
      var response = await axios.get(url)
      var parsed = JSON.parse(response.data)
      results = JSON.stringify(parsed, null, '\t')
      callback(results)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  })()
}

export function getServerStatus () {
  return serverStatus
}

export function getResults () {
  return results
}

export function status (callback) {
  return (async function callStatus (dispatch) {
    const url = 'http://localhost:3001/status'
    try {
      var response = await axios.get(url)
      serverStatus = response.data.status
      callback(serverStatus)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  })()
}

export function orders (newOrders) {
  console.log(newOrders)
  return (async function callOrders (dispatch) {
    const url = 'http://localhost:3001/orders'
    try {
      var response = await (axios.post(url, newOrders))
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  })()
}

export function getOrderData () {
  return orderList
}

