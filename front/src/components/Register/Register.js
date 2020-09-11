import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Register.css';

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Container,
} from 'semantic-ui-react';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      usernameError: false,
      email: '',
      emailError: false,
      password: '',
      passwordError: false,
      formError: false,
    };
  }

  onChange = e => {
    const { name, value } = e.target;

    // if name = "email" then value is setState to email, etc.
    this.setState({ [name]: value });
  };

  onSubmit = async e => {
    e.preventDefault();

    const { username, email, password } = this.state;

    const emailIsValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
      email,
    );

    let error = false;

    if (username === '') {
      this.setState({ usernameError: true });
      error = true;
    } else {
      this.setState({ usernameError: false });
    }

    if (emailIsValid) {
      this.setState({ emailError: false });
    } else {
      this.setState({ emailError: true });
      error = true;
    }

    if (password.length < 8) {
      this.setState({ passwordError: true });
      error = true;
    } else {
      this.setState({ passwordError: false });
    }

    if (error) {
      this.setState({ formError: true });
      return;
    }

    this.setState({ formError: false });

    await fetch('/api/user/register', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    this.setState({ username: '', email: '', password: '' });
  };

  render() {
    const {
      username,
      email,
      password,
      usernameError,
      emailError,
      passwordError,
      formError,
    } = this.state;

    const errorList = [];

    if (usernameError) {
      errorList.push('Username is required');
    }

    if (emailError) {
      errorList.push('Email must be valid');
    }

    if (passwordError) {
      errorList.push('Password must be 8 characters long');
    }

    return (
      <Container>
        <Grid centered>
          <Grid.Column mobile={15} tablet={11} computer={7}>
            <Header as="h2" textAlign="center">
              Register
            </Header>

            <Segment>
              <Form size="large" error={formError}>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={this.onChange}
                  error={usernameError}
                />

                <Form.Input
                  fluid
                  icon="at"
                  iconPosition="left"
                  placeholder="Email address"
                  name="email"
                  value={email}
                  onChange={this.onChange}
                  error={emailError}
                />

                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.onChange}
                  error={passwordError}
                />

                <Button
                  fluid
                  color="violet"
                  size="large"
                  type="submit"
                  onClick={this.onSubmit}
                  disabled={!username || !email || !password}
                >
                  Submit
                </Button>
                {usernameError || emailError || passwordError ? (
                  <Message
                    error
                    header="There was some errors with your submission"
                    list={errorList}
                  />
                ) : null}
              </Form>
            </Segment>

            <Message>
              Already have an account?{' '}
              <Link className="link" to="/login">
                Sign In
              </Link>
            </Message>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default Register;
