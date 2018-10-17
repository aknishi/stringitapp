import React from 'react';
import { withRouter } from 'react-router-dom';

class EditCustomerForm extends React.Component {
  constructor(props) {
    super(props)
    const { customer } = this.props;
    this.state = {
      id: customer.id,
      email: customer.email,
      name: customer.name,
      phone_number: customer.phone_number,
      address: customer.address,
      comment: customer.comment,
      password: "ctc2018",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.navigateToProfile = this.navigateToProfile.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state)
    if (user.id === 1) {
      user.password="123456";
    } 
    this.props.updateUser(user).then(() => this.props.history.push("/users/1"));
  }

  navigateToProfile() {
    this.props.history.push(`users/${customer.id}`);
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
        <form className="customer-form-box" onSubmit={this.handleSubmit}>
          <ul>
            {this.errors()}
          </ul>
          <h3 className="form-title">Create User</h3>
          <div className="login-form">
            <label>Full Name:</label>
            <input
              type="text"
              value={this.state.name}
              onChange={this.update('name')}
              />
            <br/>
            <label>Email:</label>
            <input
              type="text"
              value={this.state.email}
              onChange={this.update('email')}
              />
            <br/>
            <label>Phone Number:</label>
            <input
              type="text"
              value={this.state.phone_number}
              onChange={this.update('phone_number')}
              />
            <br/>
            <label>Address:</label>
            <input
              type="text"
              value={this.state.address}
              onChange={this.update('address')}
              />
            <br/>
            <label>Comment:</label>
            <textarea
              value={this.state.comment}
              onChange={this.update('comment')}
              />
            <br/>
            <input type="submit" value="Update Customer" className="blue-button"/>
            <button value="Cancel" className="cancel-button" onClick={this.navigateToProfile}/>
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(EditCustomerForm)
