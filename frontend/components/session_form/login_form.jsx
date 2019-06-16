import React from 'react';
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdminDemoLogin = this.handleAdminDemoLogin.bind(this);
    this.handleGuestDemoLogin = this.handleGuestDemoLogin.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state)
    this.props.login(user);
  }

  handleAdminDemoLogin(e) {
    e.preventDefault();
    const guest = { email: "admin@example.com", password: "admin2018" };
    this.props.login(guest)
  }

  handleGuestDemoLogin(e) {
    e.preventDefault();
    const guest = { email: "guest@example.com", password: "ctc2018" };
    this.props.login(guest)
  }

  errors() {
    if (this.props.errors) {
      return (
        this.props.errors.map(error => <li className='errors' key={error}>{error}</li>)
      );
    }
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  render() {
    return (
      <div className="container">
        <div className="form-container" onSubmit={this.handleSubmit}>
          <h3 className="form__title">Login</h3>
          <ul>
            {this.errors()}
          </ul>
          <form className="form login-form">
            <br />
            <input
              type="text"
              value={this.state.email}
              placeholder="Email"
              onChange={this.update('email')}
            />
            <br />
            <input
              type="password"
              value={this.state.password}
              placeholder="Password"
              onChange={this.update('password')}
            />
            <br />
            <button type="submit" className="btn btn--blue">Log In</button>
          </form>
        </div>
        <div className="form-container">
          <div className="form login-form">
            <button
              type="submit"
              onClick={this.handleAdminDemoLogin}
              className="btn btn--blue">
              Admin Demo Login
            </button>
            <br />
            <button
              type="submit"
              onClick={this.handleGuestDemoLogin}
              className="btn btn--blue">
              Customer Demo Login
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(LoginForm)
