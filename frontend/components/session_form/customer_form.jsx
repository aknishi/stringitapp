import React from 'react';
import { withRouter } from 'react-router-dom';

class CustomerForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      name: "",
      phone_number: "",
      address: "",
      comment: "",
      password: "ctc2018",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.returnToPage = this.returnToPage.bind(this);
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

  returnToPage(e) {
    e.preventDefault();
    this.props.history.goBack();
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
          <h3 className="form-title">Create User</h3>
          <ul>
            {this.errors()}
          </ul>
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
            <input
              id="customer-form-button"
              type="submit"
              value="Create Customer"
              className="green-button"/>
            <button
              id="customer-form-button"
              className="grey-button"
              onClick={this.returnToPage}>
            Cancel</button>
          </div>
          <div className="small-spacing-container"></div>
        </form>
      </div>
    )
  }
}

export default withRouter(CustomerForm)
