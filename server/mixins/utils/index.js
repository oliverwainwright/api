'use strict'

exports.updateTimestamps = function updateTimestamps (context, next) {
  // on single instance operations
  if (context.instance) {
    context.instance.updatedAt = new Date()
  // on batch operations
  } else {
    context.data.updatedAt = new Date()
  }
  next()
}
