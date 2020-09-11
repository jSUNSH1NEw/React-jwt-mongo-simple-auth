import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import './Login.css';

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Container,
} from 'semantic-ui-react';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailError: false,
      password: '',
      passwordError: false,
      formError: false,
      isLoggedIn: false,
    };
  }

  onChange = e => {
    const { name, value } = e.target;

    // if name = "email" then value is setState to email, etc.
    this.setState({ [name]: value });
  };

  onSubmit = async e => {
    e.preventDefault();

    const { email, password } = this.state;

    await fetch('/api/user/login', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(res => {
      if (res.status === 200) {
        localStorage.setItem('userInfo', res.headers.get('auth-token'));
        this.setState({ isLoggedIn: true });
      } else {
        res.text().then(error => {
          console.log(error);
        });
      }
    });
  };

  render() {
    const {
      email,
      password,
      emailError,
      passwordError,
      formError,
      isLoggedIn,
    } = this.state;

    if (isLoggedIn) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <Container>
        <Grid centered>
          <Grid.Column mobile={15} tablet={11} computer={7}>
            <Header as="h2" textAlign="center">
              Login
            </Header>

            <Segment>
              <Form size="large" error={formError}>
                <Form.Input
                  fluid
                  icon="user"
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
                  size="large"
                  color="violet"
                  type="submit"
                  onClick={this.onSubmit}
                  disabled={!email || !password}
                >
                  Login
                </Button>
                {emailError || passwordError ? (
                  <Message negative>
                    <Message.Header>
                      There was some errors with your submission
                    </Message.Header>
                    <p>The e-mail or password you submitted is invalid.</p>
                  </Message>
                ) : null}
              </Form>
            </Segment>

            <Message>
              Not registered yet?{' '}
              <Link className="link" to="/register">
                Sign Up
              </Link>
            </Message>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default Login;
