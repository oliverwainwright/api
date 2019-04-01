'use strict'

const { expect } = require('chai')
const utils = require('../../../../server/mixins/utils')

describe('Utility Functions', () => {
  describe('#updateTimestamps()', () => {
    it('should update `updatedAt` on an instance', (done) => {
      const context = {
        instance: {},
      }
      utils.updateTimestamps(context, () => {
        expect(context.instance.updatedAt).to.be.an.instanceof(Date)
        done()
      })
    })
    
    it('should update `updatedAt` on a request', (done) => {
      const context = {
        data: {},
      }
      utils.updateTimestamps(context, () => {
        expect(context.data.updatedAt).to.be.an.instanceof(Date)
        done()
      })
    })
  })
})