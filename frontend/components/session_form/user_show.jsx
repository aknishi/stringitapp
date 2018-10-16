import React from 'react';
import { Link, withRouter, Route } from 'react-router-dom';

class UserShow extends React.Component {
  constructor(props) {
    super(props)

    this.handleEdit = this.handleEdit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleEdit() {
    this.props.history.push(`/users/accounts/${this.props.userId}/edit`);
  }

  handleLogout() {
    this.props.logout().then(this.props.history.push(`/login`))
  }

  currentUserButtons() {
    const { currentUserId } = this.props
    if (currentUserId == this.props.match.params.userId) {
      return(
        <div>
          <button
            onClick={this.handleEdit}
            className="edit-button">
            Edit Profile</button>
          <button
            onClick={this.handleLogout}
            className="logout-button">
            Log out</button>
        </div>
      )
    }
  }

  render() {
    const { user, loading} = this.props;
    if (loading) { return <LoadingIcon />; }
    else {
      return(
        <div className="user-profile-container">
          <div className="spacing-container"></div>
          <div className="user-info-container">
            <div className="profile-pic-container">
              <div className="profile-pic">
                <img id="profile-pic" src={window.defaultProfilePhotoURL}/>
              </div>
            </div>
            <div className="user-info">
              <div className="username">
                <h3>{user.name}</h3>
                { this.currentUserButtons()}
              </div>
              <div className="user-stats">
                <h4><b>Email:</b> {user.email}</h4>
                <h4><b>Phone Number:</b> {user.phone_number}</h4>
                <h4><b>Address:</b> {user.address}</h4>
                <h4><b>Comment:</b> {user.comments}</h4>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default withRouter(UserShow)
