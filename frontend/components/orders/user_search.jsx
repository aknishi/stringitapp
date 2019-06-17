import React from 'react';
import { Link } from 'react-router-dom';

class UserSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      results: []
    }
    this.handleInput = this.handleInput.bind(this);
    this.hitEnter = this.hitEnter.bind(this);
  }

  hideResults() {
    $('#customer-search').toggleClass('hidden');
  }

  hitEnter(e) {
    if (e.keyCode == 13) {
      this.sendCustomerInfo(this.state.results[0])
    }
    if (e.keyCode == 8) {
      this.props.hideCustomerForm();
    }
  }

  sendCustomerInfo(customer) {
    this.setState({ query: customer.name });
    this.props.setupCustomer(customer);
  }

  handleInput(e) {
    $('#customer-search').toggleClass('hidden');
    $(document).on('click', this.hideResults);
    this.setState({ results: [] })
    const { customers } = this.props
    this.setState({ query: e.currentTarget.value.toLowerCase() })
    const userResults = customers.filter(customer => customer.name.toLowerCase().includes(this.state.query));
    this.setState({ results: userResults })
  }

  renderResults() {
    const userItems = this.state.results.map(customer => (
      <li
        key={customer.id}
        className="search__results__item"
        onClick={this.sendCustomerInfo.bind(this, customer)}>
        <div>
          <h5 className="search__name" id="bold">{customer.name}</h5>
        </div>
      </li>
    ));

    return (
      <ul className="search__results__list">
        {userItems}
      </ul>
    )
  }

  render() {
    return (
      <div>
        <div className="search">
          <input
            type="text"
            id="search-input"
            placeholder="Search Customer"
            value={this.state.query}
            autoComplete="off"
            onChange={this.handleInput}
            onKeyDown={this.hitEnter}
          >
          </input>
        </div>
        <div id="customer-search" className="search__results hidden">
          {this.renderResults()}
        </div>
      </div>
    )
  }
}

export default UserSearch
