const { ApolloServer } = require('apollo-server');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const mongoose = require('mongoose');
require('dotenv').config(); // use the node package dotenv to connect and config the DB

// connect to the DB with mongoose
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true }) // connect with the process.env and then add second arg to get rid of node warning
  .then(() => console.log('DB Connected'))
  .catch(err => console.error(err));

const server = new ApolloServer({ 
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`Server is listening on ${url}`);
});
