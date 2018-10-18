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
    const guest = {email:"admin@example.com", password: "123456"};
    this.props.login(guest)
  }

  handleGuestDemoLogin(e) {
    e.preventDefault();
    const guest = {email:"guest@example.com", password: "123456"};
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

  render(){
    return (
      <div className="form-container">
        <div className="spacing-container"></div>
        <form className="login-form-box" onSubmit={this.handleSubmit}>
          <ul>
            {this.errors()}
          </ul>
          <h3 className="form-title">Customer Login</h3>
          <div className="login-form">
            <br/>
            <input
              type="text"
              value={this.state.email}
              placeholder="Email"
              onChange={this.update('email')}
              />
            <br/>
            <input
              type="password"
              value={this.state.password}
              placeholder="Password"
              onChange={this.update('password')}
              />
            <br/>
            <input id="login-button" type="submit" value="Log In" className="blue-button"/>
          </div>
        </form>
        <div className="demo-login">
          <button
            type="submit"
            id="demo-login-button"
            onClick={this.handleAdminDemoLogin}
            className="blue-button">
            Admin Demo Login
          </button>
        </div>
      </div>
    )
  }
}

export default withRouter(LoginForm)
