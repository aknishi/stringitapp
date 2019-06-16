import React from 'react';
import LoadingBar from '../loading_bar';
import { withRouter } from 'react-router-dom';

class EditCustomerForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.props.customer;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.navigateOut = this.navigateOut.bind(this);
    this.customerEditButtons = this.customerEditButtons.bind(this);
  }

  componentWillMount() {
    if (this.props.formType === "Customer Edit") {
      this.props.fetchUser(this.props.match.params.userId)
    }
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state)
    this.props.updateUser(user).then(() => this.navigateOut());
  }

  navigateOut() {
    if (this.props.formType === "Customer Edit") {
      this.props.history.goBack();
    } else {
      this.props.disableForm();
    }

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

  customerEditButtons() {
    if (!this.props.disabled) {
      return (
        <div className="customer-edit-buttons">
          <button
            type="submit"
            disabled={this.props.disabled}
            className="btn-square btn-square--blue"
            onClick={this.handleSubmit}>
            Update Customer
          </button>
          <button
            className="btn-square btn-square--grey"
            onClick={this.navigateOut}>
            Cancel
          </button>
        </div>
      )
    }
  }

  render() {
    let formTitle;
    let topSpacingContainer;
    let bottomSpacingContainer;
    if (this.props.formType === "Customer Edit") {
      formTitle = <h3 className="form-title edit-user-title">Edit User</h3>
    }
    const { loading, customer } = this.props;
    if (loading) {
      return (
        <div>
          <LoadingBar />
        </div>
      )
    } else {
      if (customer.id !== "") {
        return (
          <div id="edit-customer-form" className="container">
            <div className="form-container customer-form">
              {formTitle}
              <ul>
                {this.errors()}
              </ul>
              <div className="form">
                <label>Full Name:</label>
                <input
                  type="text"
                  value={this.state.name}
                  disabled={this.props.disabled}
                  onChange={this.update('name')}
                />
                <br />
                <label>Email:</label>
                <input
                  type="text"
                  value={this.state.email}
                  disabled={this.props.disabled}
                  onChange={this.update('email')}
                />
                <br />
                <label>Phone Number:</label>
                <input
                  type="text"
                  value={this.state.phone_number}
                  disabled={this.props.disabled}
                  onChange={this.update('phone_number')}
                />
                <br />
                <label>Address:</label>
                <input
                  type="text"
                  value={this.state.address}
                  disabled={this.props.disabled}
                  onChange={this.update('address')}
                />
                <br />
                <label>Comment:</label>
                <textarea
                  value={this.state.comment}
                  disabled={this.props.disabled}
                  placeholder="Comments here"
                  onChange={this.update('comment')}
                />
                <br />
                {this.customerEditButtons()}
              </div>
            </div>
          </div>
        )
      } else {
        return <div></div>
      }
    }
  }
}

export default withRouter(EditCustomerForm)
