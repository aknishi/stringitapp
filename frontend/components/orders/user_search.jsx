import React from 'react';
import { Link } from 'react-router-dom';

class UserSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      query: '',
      results: []
    }
    this.handleInput = this.handleInput.bind(this);
    this.hitEnter = this.hitEnter.bind(this);
  }

  hideResults() {
    $('#customer-search').addClass('hidden');
  }

  hitEnter(e) {
    if (e.keyCode == 13) {
      this.sendCustomerInfo.bind(this, customer)
    }
  }

  sendCustomerInfo(customer) {
    this.setState({query: customer.name});
    $("#customer-fields").removeClass("hidden");
    $("#customer-id")[0].value = customer.id;
    $("#customer-name")[0].value = customer.name;
    $("#customer-email")[0].value = customer.email;
    $("#customer-phone")[0].value = customer.phone_number;
    $("#customer-address")[0].value = customer.address;
    $("#customer-comments")[0].value = customer.comment;
  }

  handleInput(e) {
    $('#customer-search').removeClass('hidden');
    $(document).on('click', this.hideResults);
    this.setState({ results: []})
    const { customers } = this.props
    this.setState({query: e.currentTarget.value.toLowerCase()})
    const userResults = customers.filter(customer => customer.name.toLowerCase().includes(this.state.query));
    this.setState({results: userResults})
  }

  renderResults() {
    const userItems = this.state.results.map(customer => (
      <li
        key={customer.id}
        className="search-result-item"
        onClick={this.sendCustomerInfo.bind(this, customer)}
        onKeyDown={this.hitEnter}>
        <div>
          <h5 className="search-name" id="bold">{customer.name}</h5>
        </div>
      </li>
    ));

    return (
      <ul className="search-result-list">
        {userItems}
      </ul>
    )
  }

  render() {
    return(
    <div className="search-container">
      <div className="search">
        <span className="fa fa-search"></span>
        <input
          type="text"
          id="search-input"
          placeholder="Search Customer"
          value={this.state.query}
          onChange={this.handleInput}
          >
        </input>
      </div>
      <div id="customer-search" className="search-results hidden">
        { this.renderResults() }
      </div>
    </div>
    )
  }
}

export default UserSearch