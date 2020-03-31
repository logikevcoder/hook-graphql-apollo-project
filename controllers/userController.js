const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

exports.findOrCreateUser = async token => {
  //verify auth token
  const googleUser = await verifyAuthToken(token); // verify the token and get back the google user information
  // check if the user exists
  const user = await checkIfUserExists(googleUser.email); // check if users email exists
  // if use exists, return them; otherwise create new user in the db
  return user ? user : createNewUser(googleUser); // return the user if the email does exists
};

const verifyAuthToken = async token => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.OAUTH_CLIENT_ID
    });
    return ticket.getPayload(); // part of google method similar to onsucess
  } catch (error) {
    console.error(`error verifying ${authToken}`);
  }
};

const checkIfUserExists = async email => await User.findOne({ email }).exec();

const createNewUser = googleUser => {
  const { name, email, picture } = googleUser;
  const user = { name, email, picture };

  return new User(user).save(); // to persist in the DB add the .save()
};
