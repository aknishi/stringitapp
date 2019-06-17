import React from 'react';
import { withRouter } from 'react-router-dom';

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.titleize = function () {
  var string_array = this.split(' ');
  string_array = string_array.map(function (str) {
    return str.capitalize();
  });
  return string_array.join(' ');
}

class CordForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      brand: "",
      model: "",
      gauge: "",
      length: "",
      composition: "",
      color: "",
      image: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.setupBrand = this.setupBrand.bind(this);
    this.setupComposition = this.setupComposition.bind(this);
  }

  componentDidMount() {
    this.props.fetchCords();
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleSubmit(e) {
    e.preventDefault();
    const cord = Object.assign({}, this.state)
    this.props.createCord(cord).then(() => this.props.history.push("/strings"));
  }

  errors() {
    if (this.props.errors.cord) {
      return (
        this.props.errors.cord.map(error => <li className='errors' key={error}>{error}</li>)
      );
    }
  }

  setupBrand(e) {
    if (e.currentTarget.value === "- New Brand -") {
      $("#new-cord-brand").removeClass("hidden")
    } else {
      $("#new-cord-brand").addClass("hidden")
      this.setState({ ["brand"]: e.currentTarget.value });
    }
  }

  setupComposition(e) {
    if (e.currentTarget.value === "- New Composition -") {
      $("#new-cord-composition").removeClass("hidden")
    } else {
      $("#new-cord-composition").addClass("hidden")
      this.setState({ ["composition"]: e.currentTarget.value });
    }
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value.titleize() });
  }

  updateImageUrl(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  render() {
    const { cords } = this.props;

    const uniqueCordBrands = []
    cords.forEach(cord => {
      if (!uniqueCordBrands.includes(cord.brand)) {
        uniqueCordBrands.push(cord.brand)
      }
    })
    const cordBrandItems = uniqueCordBrands.map(
      (brand, idx) => <option key={idx} value={brand}>{brand}</option>);

    const uniqueCordCompositions = []
    cords.forEach(cord => {
      if (!uniqueCordCompositions.includes(cord.composition)) {
        uniqueCordCompositions.push(cord.composition)
      }
    })
    const cordCompositionItems = uniqueCordCompositions.map(
      (composition, idx) => <option key={idx} value={composition}>{composition}</option>);

    return (
      <div className="container">
        <form className="form-container" onSubmit={this.handleSubmit}>
          <h3 className="form__title">New String</h3>
          <ul>
            {this.errors()}
          </ul>
          <div className="form cord-form">
            <label>Brand:</label>
            <select onChange={this.setupBrand} id="cord-brand">
              <option>-- Select a Brand --</option>
              {cordBrandItems}
              <option>- New Brand -</option>
            </select>
            <div id="new-cord-brand" className="new-cord-brand hidden">
              <label>New Brand:</label>
              <input
                type="text"
                value={this.state.brand}
                onChange={this.update('brand')}
              />
            </div>
            <label>Model:</label>
            <input
              type="text"
              value={this.state.model}
              onChange={this.update('model')}
            />
            <label>Gauge:</label>
            <input
              type="text"
              value={this.state.gauge}
              onChange={this.update('gauge')}
            />
            <label>Length:</label>
            <input
              type="text"
              value={this.state.length}
              onChange={this.update('length')}
            />
            <label>Composition:</label>
            <select onChange={this.setupComposition} id="cord-composition">
              <option>-- Select a Composition --</option>
              {cordCompositionItems}
              <option>- New Composition -</option>
            </select>
            <div id="new-cord-composition" className="new-cord-composition hidden">
              <label>New Composition:</label>
              <input
                type="text"
                value={this.state.composition}
                onChange={this.update('composition')}
              />

            </div>
            <label>Color:</label>
            <input
              type="text"
              value={this.state.color}
              onChange={this.update('color')}
            />
            <label>Image URL:</label>
            <input
              type="text"
              value={this.state.image}
              onChange={this.updateImageUrl('image')}
            />
            <input type="submit" value="Add Cord" className="btn btn--green" />
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(CordForm)
