import {
  getServerStatus,
  getOrderData,
  default as counterReducer
} from 'redux/modules/orderAPI'

describe('(Redux Module) Counter', function () {
  it('expect getServerStatus to equal Not Ready.', function () {
    expect(getServerStatus()).to.equal('Not Ready')
  })

  it('expect order_number of first element of getOrderData to equal 20150111000001.', function () {
    var orderList = getOrderData()
    expect(orderList[0].order_number).to.equal('20150111000001')
  })
})
