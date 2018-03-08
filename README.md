## File Handling with prisma, graphql-yoga, AWS S3 and React.js 

This example demonstrates how to implement a GraphQL server with a file handling API based on AWS S3, Prisma & graphql-yoga's built-in `apollo-upload-server`. Additionally, a React.js frontend shows how to implement `apollo-upload-client`.


Installation

```
git clone https://github.com/manticarodrigo/prisma-s3.git
cd /path/to/repo
```

Deploy server

```
cd server
yarn install
prisma deploy
yarn start
```

Deploy client

```
yarn install
yarn start
```