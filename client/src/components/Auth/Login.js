import React, { useContext } from 'react';
import { GraphQLClient } from 'graphql-request';
import { GoogleLogin } from 'react-google-login';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Context from '../../context';

import { ME_QUERY } from '../../graphql/queries';

const Login = ({ classes }) => {
  const { dispatch } = useContext(Context);

  const onSuccess = async googleUser => {
    try {
      const idToken = googleUser.getAuthResponse().id_token;

      const client = new GraphQLClient('http://localhost:4000/graphql', {
        headers: { authorization: idToken } // pass in the idToken from the google login
      });

      const { me } = await client.request(ME_QUERY); // ask for current User data AFTER user logs in
      dispatch({ type: 'LOGIN_USER', payload: me });
      dispatch({ type: 'IS_LOGGED_IN', payload: googleUser.isSignedIn() });
    } catch (err) {
      onFailure(err);
    }
  };

  const onFailure = err => {
    console.error('Error logging in', err);
  };

  return (
    <div className={classes.root}>
      <Typography
        component='h1'
        variant='h3'
        gutterBottom
        nowrap
        style={{ color: 'rgb(66, 133, 244' }}
      >
        Welcome
      </Typography>
      <GoogleLogin
        clientId='4343767367-fku2cqh6vc589omut9ua87mjfu5tbmr1.apps.googleusercontent.com'
        onSuccess={onSuccess}
        onFailure={onFailure}
        isSignedIn={true}
        theme='dark'
      >
        Sign in with Google
      </GoogleLogin>
    </div>
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
