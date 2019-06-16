import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleAdminDemoLogin = this.handleAdminDemoLogin.bind(this);
  }

  handleLogin(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.login(user).then(this.props.history.push("/orders"));
  }

  handleLogout() {
    this.props.logout();
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  handleAdminDemoLogin(e) {
    e.preventDefault();
    const guest = { email: "admin@example.com", password: "admin2018" };
    this.props.login(guest).then(() => this.props.history.push("/orders"))
  }

  userButtons() {
    const { currentUserId } = this.props;
    if (!currentUserId) {
      return (
        <form className="nav-login-form" onSubmit={this.handleLogin}>
          <input
            type="text"
            value={this.state.email}
            placeholder="Email"
            onChange={this.update('email')}
          />
          <input
            type="password"
            value={this.state.password}
            placeholder="Password"
            onChange={this.update('password')}
          />
          <button type="submit" className="btn btn--blue">Log In</button>
          <button
            type="submit"
            onClick={this.handleAdminDemoLogin}
            className="btn btn--green">
            Demo Login
            </button>
        </form >
      )
    } else {
      return (
        <div className="nav-login-form">
          <Link to="/orders">
            <img src={window.ordersIconURL} className="icon" alt="orders" />
          </Link>
          <Link to="/rackets">
            <img src={window.racketIconURL} className="icon" alt="rackets" />
          </Link>
          <Link to="/strings">
            <img src={window.stringIconURL} className="icon" alt="strings" />
          </Link>
          <Link to={`/users/${currentUserId}`}>
            <img src={window.profileIconURL} className="icon" alt="profile" />
          </Link>
          <button
            onClick={this.handleLogout}
            className="btn btn--white">
            Log out
          </button>
        </div>
      )
    }
  }

  errors() {
    if (this.props.errors) {
      return (
        this.props.errors.map(error => <li className='errors' key={error}>{error}</li>)
      );
    }
  }

  render() {
    const { errors, currentUserId, login, logout } = this.props;
    return (
      <nav className="navbar">
        <div className="logo">
          <Link to="/" className="logo__link">
            <img className="logo__image" src={window.logoURL}></img>
          </Link>
        </div>
        <div>
          <ul className="navbar__links">
            {this.userButtons()}
          </ul>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navbar);
