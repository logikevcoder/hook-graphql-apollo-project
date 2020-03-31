const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config(); // use the node package dotenv to connect and config the DB

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { findOrCreateUser } = require('./controllers/userController');

// connect to the DB with mongoose
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true }) // connect with the process.env and then add second arg to get rid of node warning
  .then(() => console.log('DB Connected'))
  .catch(err => console.error(err));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let authToken = null;
    let currentUser = null;

    try { // intercept the authToken defined in Login.js
      authToken = req.headers.authorization;
      if (authToken) {
        currentUser = await findOrCreateUser(authToken);
      }
    } catch (err) {
      console.error(`Unable to authenticate use with token ${authToken}`);
    }
    return { currentUser };
  }
});

server.listen().then(({ url }) => {
  console.log(`Server is listening on ${url}`);
});
