import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Container, Image, Menu } from 'semantic-ui-react';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
    };
  }

  render() {
    const { isLoggedIn } = this.state;
    return (
      <Menu>
        {isLoggedIn ? (
          <Container>
            <Menu.Item as={Link} to="/" header>
              <Image size="mini" src="https://react.semantic-ui.com/logo.png" />
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item as={NavLink} to="/dashboard" name="dashboard">
                Dashboard
              </Menu.Item>
              <Menu.Item as={NavLink} to="/" name="logout">
                Logout
              </Menu.Item>
            </Menu.Menu>
          </Container>
        ) : (
          <Container>
            <Menu.Item as={Link} to="/" header>
              <Image size="mini" src="https://react.semantic-ui.com/logo.png" />
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item as={NavLink} to="/login" name="login">
                Login
              </Menu.Item>
              <Menu.Item as={NavLink} to="/register" name="register">
                Register
              </Menu.Item>
            </Menu.Menu>
          </Container>
        )}
      </Menu>
    );
  }
}

export default Navbar;
