import React from 'react';
import withRoot from '../withRoot';
import Header from '../components/Header';

const App = () => {
  return (
    <div>
      <Header />
      App
    </div>
  );
};

export default withRoot(App);
