const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const ParrotsAPI = require('./datasources');
const fakeParrots = require('./parrots');

const store = { 
  parrots: fakeParrots,
};

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  dataSources: () => ({
    parrotsAPI: new ParrotsAPI({ store })
  }),
 });

const hostname = '127.0.0.1';
const port = 4000;

server.listen().then(() => {
    console.log(`Server running at http://${hostname}:${port}/`);
});