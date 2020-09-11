import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'semantic-ui-react';

import './Home.css';

function Home() {
  return (
    <div className="Home">
      <Button as={Link} to="login" primary>
        Login
      </Button>
      <Button as={Link} to="register" secondary>
        Register
      </Button>
    </div>
  );
}

export default Home;
