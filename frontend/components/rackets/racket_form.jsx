import React from 'react';
import { withRouter } from 'react-router-dom';

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.titleize = function() {
    var string_array = this.split(' ');
    string_array = string_array.map(function(str) {
       return str.capitalize();
    });

    return string_array.join(' ');
}

class RacketForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      brand: "",
      model: "",
      color: "",
      image: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.setupBrand = this.setupBrand.bind(this);
  }

  componentDidMount() {
    this.props.fetchRackets();
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleSubmit(e) {
    e.preventDefault();
    const racket = Object.assign({}, this.state)
    this.props.createRacket(racket).then(() => this.props.history.push("/rackets"));
  }

  errors() {
    if (this.props.errors) {
      return (
        this.props.errors.map(error => <li className='errors' key={error}>{error}</li>)
      );
    }
  }

  setupBrand(e) {
    if (e.currentTarget.value === "Other") {
      $("#new-racket-brand").removeClass("hidden")
    } else {
      $("#new-racket-brand").addClass("hidden")
      this.setState({ ["brand"]: e.currentTarget.value });
    }
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value.titleize() });
  }

  updateImageUrl(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  render(){
    const { rackets } = this.props;
    const uniqueRacketBrands = []
    rackets.forEach(racket => {
      if (!uniqueRacketBrands.includes(racket.brand)) {
        uniqueRacketBrands.push(racket.brand)
      }})
    const racketBrandItems = uniqueRacketBrands.map(
      (brand, idx) => <option key={idx} value={brand}>{brand}</option>);
    return (
      <div className="form-container">
        <div className="spacing-container"></div>
        <form className="racket-form-box" onSubmit={this.handleSubmit}>
          <h3 className="form-title">New Racket</h3>
          <ul>
            {this.errors()}
          </ul>
          <div className="racket-form">
            <label>Brand:</label>
            <select onChange={this.setupBrand} id="racket-brand">
              <option>-- Select a Brand --</option>
              { racketBrandItems }
              <option>Other</option>
            </select>
            <br />
            <div id="new-racket-brand" className="new-racket-brand hidden">
              <label>New Brand:</label>
              <input
                type="text"
                value={this.state.brand}
                onChange={this.update('brand')}
                />
              <br/>
            </div>
            <label>Model:</label>
            <input
              type="text"
              value={this.state.model}
              onChange={this.update('model')}
              />
            <br/>
            <label>Color:</label>
            <input
              type="text"
              value={this.state.color}
              onChange={this.update('color')}
              />
            <br/>
            <label>Image URL:</label>
            <input
              type="text"
              value={this.state.image}
              onChange={this.updateImageUrl('image')}
              />
            <br/>
            <input type="submit" value="Add Racket" className="green-button"/>
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(RacketForm)
