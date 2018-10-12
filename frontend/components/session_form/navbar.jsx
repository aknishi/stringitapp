import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password : ""
    }
      this.handleLogin = this.handleLogin.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
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

    userButtons() {
      const { currentUserId } = this.props;
      if (!currentUserId) {
        return(
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
            <input type="submit" value="Log In" className="login-button"/>
          </form>
        )
      } else {
        return(
          <div className="nav-login-form">
            <Link to="/orders">
              <img src={window.ordersIconURL} className="icon" alt="orders"/>
            </Link>
            <Link to="/rackets">
              <img src={window.racketIconURL} className="icon" alt="rackets"/>
            </Link>
            <Link to="/strings">
              <img src={window.stringIconURL} className="icon" alt="strings"/>
            </Link>
            <Link to="/profile">
              <img src={window.profileIconURL} className="icon" alt="profile"/>
            </Link>
            <button
                onClick={this.handleLogout}
                className="logout-button">
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

  render () {
    const { errors, currentUserId, login, logout } = this.props;
    return(
      <nav>
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <img className="ball-logo" src={window.tennisBallLogoURL}></img>
            <img className="logo" src={window.logoURL}></img>
          </Link>
        </div>
        <div>
          <ul className="navbar-links">
            {this.userButtons()}
          </ul>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navbar);
