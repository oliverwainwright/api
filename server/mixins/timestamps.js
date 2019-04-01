'use strict'

// it can take vscode a bit to recognize this
const utils = require('./utils')

module.exports = function timestampMixin (Model) {
  const property = {
    type: Date,
    default: '$now',
  }

  // set default createdAt and updatedAt to current time
  Model.defineProperty('createdAt', property)
  Model.defineProperty('updatedAt', property)

  // before each model save, run the updateTimestamps()
  Model.observe('before save', utils.updateTimestamps)
}
