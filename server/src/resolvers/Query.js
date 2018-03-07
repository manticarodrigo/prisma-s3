const Query = {

  file(parent, { id }, context, info) {
    return context.db.query.file({ where: { id } }, info)
  },
  
  files(parent, args, context, info) {
    return context.db.query.files(args, info)
  }
}

module.exports = { Query }