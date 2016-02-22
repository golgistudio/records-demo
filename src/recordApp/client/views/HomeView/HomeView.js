var React = require('react')

import {orders, fees, distributions} from '../../redux/modules/orderAPI'
import {getServerStatus, getOrderData, status} from '../../redux/modules/orderAPI'
import {orderList} from '../../redux/modules/orderData'
import Banner from './agencybanner.jpg'
import classes from './HomeView.scss'
import '../../styles/core.scss'

var HomeView = React.createClass({
  getInitialState () {
    var serverStatus = getServerStatus()
    var results = ''
    var resultName = ' '

    return {
      serverStatus: serverStatus,
      orderData: JSON.stringify(orderList, null, '\t'),
      results: results,
      resultName: resultName
    }
  },

  setOrders () {
    var newOrders = JSON.parse(document.getElementById('orderInput').value)
    orders(newOrders)
  },

  processFeeResults (results) {
    this.state.results = results
    this.state.resultName = 'Fees'
    this.forceUpdate()
  },

  getFees () {
    fees(this.processFeeResults)
  },

  processStatus (results) {
    this.state.serverStatus= results
    this.forceUpdate()
  },

  getStatus () {
    status(this.processStatus)
  },

  processDistributionResults (results) {
    this.state.results = results
    this.state.resultName = 'Distributions'
    this.forceUpdate()
  },

  getDistributions () {
    distributions(this.processDistributionResults)
  },

  orderData () {
    return getOrderData()
  },

  render () {
    var statusClass = ' '
    if (this.state.serverStatus === 'ready') {
      statusClass += ' btn-success'
    } else {
      statusClass += ' btn-danger'
    }

    statusClass += ' btn'

    return (
      <div className='container'>
        <div className='row'>
          <img className={classes.banner}
            src={Banner}
            alt='Agency Banner.' />
        </div>
        <div className='row'>&nbsp;</div>
        <div className='row'>
          <div className='col-xs-9 col-md-9'>
            <button className='btn btn-default' onClick={this.setOrders}>Orders </button>
                {'  '}
            <button className='btn btn-default' onClick={this.getFees}>Fees </button>
                {'  '}
            <button className='btn btn-default' onClick={this.getDistributions}> Distributions </button>
          </div>
          <div className='col-xs-3 col-md-3'>
            <button className={statusClass} onClick={this.getStatus}>Status : {this.state.serverStatus}</button>
          </div>
        </div>
        <div className='row'>&nbsp;</div>
        <div className='row'>
          <div className='col-xs-5 col-md-5 '>
            <div className='panel panel-default'>
              <div className='panel-heading'>Orders</div>
              <div className='panel-body'>
                <textarea className='orderInputClass' id='orderInput' rows='30' >
                  {this.state.orderData}
                </textarea>
              </div>
            </div>
          </div>
          <div className='col-xs-1 col-md-1'> &nbsp;</div>
          <div className='col-xs-6 col-md-6'>
            <div className='panel panel-default'>
              <div className='panel-heading'>{this.state.resultName}</div>
              <div className='panel-body'>
                <textarea className='orderOutputClass' id='orderOutput' rows='30' value={this.state.results} readOnly>

                </textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = HomeView
