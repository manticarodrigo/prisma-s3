const uuid = require('uuid/v1')
const aws = require('aws-sdk')

const s3 = new aws.S3({
  accessKeyId: 'foo',
  secretAccessKey: 'bar',
  params: {
    Bucket: 'com.prisma.s3'
  },
  endpoint: new aws.Endpoint('http://localhost:4569') // fake s3 endpoint for local dev
})

exports.processUpload = async ( upload, ctx ) => {
  if (!upload) {
    return console.log('ERROR: No file received.')
  }
  
  const { stream, filename, mimetype, encoding } = await upload
  const key = uuid() + '-' + filename

  // Upload to S3
  const response = await s3
    .upload({
      Key: key,
      ACL: 'public-read',
      Body: stream
    }).promise()

  const url = response.Location

  // Sync with Prisma
  const data = {
    filename,
    mimetype,
    encoding,
    url,
  }

  const { id } = await ctx.db.mutation.createFile({ data }, ` { id } `)

  const file = {
    id,
    filename,
    mimetype,
    encoding,
    url,
  }

  console.log('saved prisma file:')
  console.log(file)

  return file
}