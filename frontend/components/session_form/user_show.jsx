import React from 'react';
import { Link, withRouter, Route } from 'react-router-dom';
import LoadingBar from '../loading_bar';
import UsersSearch from './users_search';

class UserShow extends React.Component {
  constructor(props) {
    super(props)

    this.handleEdit = this.handleEdit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.navigateToUserForm= this.navigateToUserForm.bind(this);
    this.navigateToUsersSearch = this.navigateToUsersSearch.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  handleEdit() {
    this.props.history.push(`/users/accounts/${this.props.userId}/edit`);
  }

  handleLogout() {
    this.props.logout().then(this.props.history.push(`/login`))
  }

  navigateToUsersSearch() {
    this.props.history.push("users/search");
  }

  navigateToUserForm() {
    this.props.history.push("/customer-form");
  }

  editButton() {
    const { currentUserId } = this.props
    if (currentUserId == this.props.match.params.userId || currentUserId === 1) {
      return(
        <div>
          <button
            onClick={this.handleEdit}
            className="edit-button">
            Edit Profile</button>
        </div>
      )
    }
  }

  searchUsersButton() {
    const { currentUserId, customers, fetchUsers } = this.props
    if (currentUserId === 1) {
      return(
        <div className="admin-buttons">
          <UsersSearch customers={customers} fetchUsers={fetchUsers}/>
          <h5 className="or">OR</h5>
          <button
            onClick={this.navigateToUserForm}
            id="admin-create-customer-button"
            className="blue-button">
            Create a Customer
          </button>
        </div>
      )
    }
  }

  render() {
    const { user, loading } = this.props;
    if (loading) {
      return (
        <div>
          <div className="loading-spacing-container"></div>
          <LoadingBar />
        </div>
      )
    } else {
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
                { this.editButton()}
              </div>
              <div className="user-stats">
                <h5><b>Email:</b> {user.email}</h5>
                <h5><b>Phone Number:</b> {user.phone_number}</h5>
                <h5><b>Address:</b> {user.address}</h5>
                <h5><b>Comment:</b> {user.comments}</h5>
              </div>
            </div>
          </div>
          <div className="customer-search-container">
            <h4>Customer Management</h4>
            { this.searchUsersButton()}
          </div>
        </div>
      )
    }
  }
}

export default withRouter(UserShow)
