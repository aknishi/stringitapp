import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class UserSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      query: '',
      results: []
    }
    this.handleInput = this.handleInput.bind(this);
    this.navigateToCustomerProfile = this.navigateToCustomerProfile.bind(this);
  }

  hideResults() {
    $('#customer-search').addClass('hidden');
  }

  navigateToCustomerProfile(customer) {
    this.setState({query: customer.name});
    this.props.history.push(`/users/${customer.id}`);
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
        className="search-result-item">
        <div onClick={this.navigateToCustomerProfile.bind(this, customer)}>
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
        <input
          type="text"
          id="search-input"
          placeholder="Search Customer"
          autoComplete="off"
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

export default withRouter(UserSearch)
