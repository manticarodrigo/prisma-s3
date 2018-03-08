const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const { processUpload } = require('./modules/fileApi')
const cors = require('cors')

const resolvers = {
  Query: {
    file(parent, { id }, context, info) {
      return context.db.query.file({ where: { id } }, info)
    },
    
    files(parent, args, context, info) {
      return context.db.query.files(args, info)
    }
  },
  Mutation: {
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
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'http://localhost:4466/prisma-s3/dev',
      secret: 'mysecret123',
      debug: true,
    }),
  }),
})

server.express.use('/*', cors()) // allow cors

server.start(() => console.log('Server is running on http://localhost:4000'))
