import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { bindActionCreators } from 'redux'
var HomeView = require('views/HomeView/HomeView')
import { mount } from 'enzyme'

describe('(View) Home', function () {
  let _component, _rendered, _props, _spies

  beforeEach(function() {
    _spies = {}
    const renderer = TestUtils.createRenderer()
    renderer.render(<HomeView />)
    _component = renderer.getRenderOutput()
    _rendered = TestUtils.renderIntoDocument(<HomeView />)
  });

  it("wraps a paragraph with a <div> with a proper class name", function() {
    expect(_component.type).to.equal('div')
  })

  it('Should render as a <div>.', function () {
    const shallowRenderer = TestUtils.createRenderer()
    shallowRenderer.render(React.createElement(HomeView), {})

    const _component = shallowRenderer.getRenderOutput()
    expect(_component.type).to.equal('div')
  })

  it('Should render buttons.', function () {
    const wrapper = mount(<HomeView/>)

    expect(wrapper).to.have.descendants('.btn')
  })

  describe('An distributions button...', function () {
    let _btn

    beforeEach(() => {
      _btn = TestUtils.scryRenderedDOMComponentsWithTag(_rendered, 'button')
        .filter(a => /Distributions/.test(a.textContent))[0]
    })

    it('should be rendered.', function () {
      expect(_btn).to.exist
    })
  })

  describe('A Fees button...', function () {
    let _btn

    beforeEach(() => {
      _btn = TestUtils.scryRenderedDOMComponentsWithTag(_rendered, 'button')
        .filter(a => /Fees/.test(a.textContent))[0]
    })

    it('should be rendered.', function () {
      expect(_btn).to.exist
    })
  })
})
