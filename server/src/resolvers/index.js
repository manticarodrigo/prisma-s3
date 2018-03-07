const { Query } = require('./Query')
const { file } = require('./Mutation/file')

module.exports = {
  Query,
  Mutation: {
    ...file,
  }
}