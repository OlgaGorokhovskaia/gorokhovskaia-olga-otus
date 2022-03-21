const { ApolloServer } = require('apollo-server');
const typeDefs = require('./scheme');
const mocks = require('./mocks');

const server = new ApolloServer({
    typeDefs,
    mocks,
  });

const hostname = '127.0.0.1';
const port = 4000;

server.listen().then(() => {
    console.log(`Server running at http://${hostname}:${port}/`);
});