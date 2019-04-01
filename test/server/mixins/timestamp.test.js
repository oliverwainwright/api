'use strict'

const { expect } = require('chai')
const sinon = require('sinon')
const timestamps = require('../../../server/mixins/timestamps.js')
const utils = require('../../../server/mixins/utils')

describe('Timetstamp Mixins', () => {
  let Model

  // set up the testing "Model" before each test
  beforeEach(() => {
    Model = {
      defineProperty: sinon.stub(),
      observe: sinon.stub(),
    }
  })

  it('should it should define a createdAt property', () => {
    // put testing "Model" through the function
    timestamps(Model)

    // assert that it was called with the correct settings
    expect(Model.defineProperty.calledWith('createdAt', {
      type: Date,
      default: '$now',
    })).to.be.true
  })

  it('should it should define a updatedAt property', () => {
    timestamps(Model)
    expect(Model.defineProperty.calledWith('updatedAt', {
      type: Date,
      default: '$now',
    })).to.be.true
  })

  it('should call the updateTimestamps helper on a before save observation', () => {
    timestamps(Model)
    expect(Model.observe.calledWith('before save', utils.updateTimestamps)).to.be.true
  })
})