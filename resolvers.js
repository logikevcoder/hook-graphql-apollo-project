const user = {
  _id: '1',
  name: 'Kevin Napier',
  email: 'kevin@gmail.com',
  picture: 'http://bit.ly/CRA-PWA'
};

module.exports = {
  Query: {
    me: () => user
  }
};
