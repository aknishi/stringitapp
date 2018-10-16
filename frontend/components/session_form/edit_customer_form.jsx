import React from 'react';
import { withRouter } from 'react-router-dom';

class EditCustomerForm extends React.Component {
  constructor(props) {
    super(props)
    const { customer } = this.props;
    this.state = {
      email: customer.email,
      name: customer.name,
      phone_number: customer.phone_number,
      address: customer.address,
      comment: customer.comment,
      password: "ctc2018",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchOrders();
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state)
    this.props.createUser(user).then(() => this.props.history.push("/orderform"));
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
              placeholder="name@example.com"
              onChange={this.update('email')}
              />
            <br/>
            <label>Phone Number:</label>
            <input
              type="text"
              value={this.state.phone_number}
              placeholder="XXX-XXX-XXXX"
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
              placeholder="Comment"
              onChange={this.update('comment')}
              />
            <br/>
            <input type="submit" value="Create Customer" className="green-button"/>
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(EditCustomerForm)
