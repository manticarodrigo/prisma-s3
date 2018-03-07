const { processUpload } = require('../../modules/fileApi')

const file = {
  async uploadFile(parent, { file }, ctx, info) {
    return await processUpload(await file, ctx)
  },

  async uploadFiles(parent, { files }, ctx, info) {
    return Promise.all(files.map(file => processUpload(file, ctx)))
  },

  async renameFile(parent, { id, name }, ctx, info) {
    return ctx.db.mutation.updateFile({ data: { name }, where: { id } }, info)
  },

  async deleteFile(parent, { id }, ctx, info) {
    return await ctx.db.mutation.deleteFile({ where: { id } }, info)
  },
}

module.exports = { file }