const { AuthenticationError } = 'apollo-server';
const user = {
  _id: '1',
  name: 'Kevin Napier',
  email: 'kevin@gmail.com',
  picture: 'http://bit.ly/CRA-PWA'
};

const authenticated = next => (root, args, ctx, info) => {
  if (!ctx.currentUser) { // if the currentUser does not exist throw error
    throw new AuthenticationError('You must be logged in');
  }
  // if they do exist 
  return next(root, args, ctx, info);
};

module.exports = {
  Query: {
    me: authenticated((root, args, ctx) => ctx.currentUser)
  }
};
