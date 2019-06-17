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

  render() {
    return (
      <div className="container">
        <form className="form-container" onSubmit={this.handleSubmit}>
          <h3 className="form__title">Create User</h3>
          <ul>
            {this.errors()}
          </ul>
          <div className="form customer-form">
            <label>Full Name:</label>
            <input
              type="text"
              value={this.state.name}
              onChange={this.update('name')}
            />
            <label>Email:</label>
            <input
              type="text"
              value={this.state.email}
              placeholder="name@example.com"
              onChange={this.update('email')}
            />
            <label>Phone Number:</label>
            <input
              type="text"
              value={this.state.phone_number}
              placeholder="XXX-XXX-XXXX"
              onChange={this.update('phone_number')}
            />
            <label>Address:</label>
            <input
              type="text"
              value={this.state.address}
              onChange={this.update('address')}
            />
            <label>Comment:</label>
            <textarea
              value={this.state.comment}
              placeholder="Comment"
              onChange={this.update('comment')}
            />
            <div className="customer-form__buttons">
              <button
                id="customer-form-button"
                type="submit"
                className="btn btn--green"
              >
                Create Customer
              </button>
              <button
                id="customer-form-button"
                className="btn btn--grey"
                onClick={this.returnToPage}
              >
                Cancel
              </button>
            </div>

          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(CustomerForm)
