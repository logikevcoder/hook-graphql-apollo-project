import React from 'react';
import { GraphQLClient } from 'graphql-request';
import { GoogleLogin } from 'react-google-login';
import { withStyles } from '@material-ui/core/styles';
// import Typography from "@material-ui/core/Typography";

const ME_QUERY = `{
  me {
    _id
    name
    email
    picture
  }
}`;

const Login = ({ classes }) => {
  const onSuccess = async googleUser => {
    const idToken = googleUser.getAuthResponse().id_token;
    const client = new GraphQLClient('http://localhost:4000/graphql', {
      headers: { authorization: idToken } // pass in the idToken from the google login
    });
    const data = await client.request(ME_QUERY); // ask for current User data AFTER user logs in
    console.log({ data });
  };

  return (
    <GoogleLogin
      clientId='4343767367-fku2cqh6vc589omut9ua87mjfu5tbmr1.apps.googleusercontent.com'
      onSuccess={onSuccess}
      isSignedIn={true}
    >
      Login
    </GoogleLogin>
  );
};

const styles = {
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  }
};

export default withStyles(styles)(Login);
