import React from 'react';
import { withRouter } from 'react-router-dom';

class SignupForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      name: "",
      password: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state)
    this.props.signup(user);
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
        <form className="login-form-box" onSubmit={this.handleSubmit}>
          <ul>
            {this.errors()}
          </ul>
          <h3 className="form-title">Pixtagram</h3>
          <h4 className="subtext">Sign up to see photos</h4>
          <h4 className="subtext">from your friends.</h4>
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
              type="text"
              value={this.state.name}
              placeholder="Full Name"
              onChange={this.update('name')}
              />
            <br/>
            <input
              type="password"
              value={this.state.password}
              placeholder="Password"
              onChange={this.update('password')}
              />
            <br/>
            <input type="submit" value="Sign Up" className="button"/>
          </div>
        </form>
        <div className="reroute-session">
          <h3>Have an account?  {this.props.navLink}</h3>
        </div>
      </div>
    )
  }
}

export default withRouter(SignupForm)
