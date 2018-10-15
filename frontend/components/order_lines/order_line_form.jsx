import React from 'react';
import { withRouter } from "react-router"

class OrderLineForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      order_id: this.props.orderId,
      racket_id: "",
      racket_brand: "",
      racket_model: "",
      racket_image: "",
      main_cord_id: "",
      main_tension: "",
      main_brand: "",
      main_model: "",
      cross_cord_id: "",
      cross_tension: "",
      cross_brand: "",
      cross_model: ""
    }
    this.racketImage = this.racketImage.bind(this);
    this.navigateToRacketForm = this.navigateToRacketForm.bind(this);
    this.navigateToStringForm = this.navigateToStringForm.bind(this);
    this.updateRacketId = this.updateRacketId.bind(this);
    this.updateMainId = this.updateMainId.bind(this);
    this.updateCrossId = this.updateCrossId.bind(this);
    this.updateRacketModels = this.updateRacketModels.bind(this);
    this.updateMainModels = this.updateMainModels.bind(this);
    this.updateCrossModels = this.updateCrossModels.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.processNewOrderLine = this.processNewOrderLine.bind(this);
  }

  racketImage() {
    if (this.state.racket_image !== "") {
      return (
        <div className="racket-order-image">
          <img src={this.state.racket_image} />
        </div>
      )
    } else {
      return (
        <div className="racket-order-image"></div>
      )
    }
  }

  navigateToRacketForm() {
    this.props.history.push("/racket-form")
  }

  navigateToStringForm() {
    this.props.history.push("/string-form")
  }

  updateRacketModels(e) {
    const { rackets } = this.props;
    const racketModels = rackets.filter(racket => racket.brand === this.state.racket_brand).map(
      racket => ( <option
                    key={racket.id}
                    value={racket.model}
                    data-racketid={racket.id}
                    data-image={racket.image}>
                    {racket.model}
                  </option> ));
    return racketModels;
  }

  updateMainModels(e) {
    const { cords } = this.props;
    const mainModels = cords.filter(cord => cord.brand === this.state.main_brand).map(
      cord => <option
                key={cord.id}
                value={cord.model}
                data={cord.id}>
                {cord.model} {cord.gauge} {cord.composition} {cord.color}
              </option>);
    return mainModels;
  }

  updateCrossModels(e) {
    const { cords } = this.props;
    const crossModels = cords.filter(cord => cord.brand === this.state.cross_brand).map(
      cord => <option
                key={cord.id}
                value={cord.model}
                data={cord.id}>
                {cord.model} {cord.gauge} {cord.composition} {cord.color}
              </option>);
    return crossModels;
  }

  updateRacketId(e) {
    var sel = $('#racket-model');
    var selected = sel[0].options[sel[0].options.selectedIndex]
    const racketId = selected.getAttribute('data-racketid');
    const imageUrl = selected.getAttribute('data-image');
    this.setState({ ["racket_model"]: e.currentTarget.value });
    this.setState({ ["racket_image"]: imageUrl });
    this.setState({ ["racket_id"]: racketId });
  }

  updateMainId(e) {
    var sel = $('#main-model');
    var selected = sel[0].options[sel[0].options.selectedIndex]
    const cordId = selected.getAttribute('data');
    this.setState({ ["main_model"]: e.currentTarget.value });
    this.setState({ ["main_cord_id"]: cordId });
  }

  updateCrossId(e) {
    var sel = $('#cross-model');
    var selected = sel[0].options[sel[0].options.selectedIndex]
    const cordId = selected.getAttribute('data');
    this.setState({ ["cross_model"]: e.currentTarget.value });
    this.setState({ ["cross_cord_id"]: cordId });
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  hideOrderLineForm(orderId) {
    $(`#add-button-${orderId}`).removeClass('hidden');
    $(`#ol-form-${orderId}`).addClass('hidden');
  }

  handleSubmit() {
    this.processNewOrderLine();
  }

  processNewOrderLine() {
    const { createOrderLine, orderId } = this.props;
    let orderLine = Object.assign({}, this.state);
    delete orderLine.racket_model;
    delete orderLine.racket_brand;
    delete orderLine.racket_image;
    delete orderLine.main_brand;
    delete orderLine.main_model;
    delete orderLine.cross_brand;
    delete orderLine.cross_model;
    createOrderLine(orderLine).then(
        () => this.hideOrderLineForm(orderId));
  }

  errors() {
    if (this.props.errors) {
      return (
        this.props.errors.map(error => <li className='errors' key={error}>{error}</li>)
      );
    }
  }

  render() {
    const { rackets, cords, orderId } = this.props;

    const racketBrands = rackets.map(racket => racket.brand);
    const uniqueRacketBrands = Array.from(new Set(racketBrands))
    const racketBrandItems = uniqueRacketBrands.map(
      (brand, idx) => <option key={idx} value={brand}>{brand}</option>);

    const racketModelItems = this.updateRacketModels();

    const mainBrands = cords.map(cord => cord.brand);
    const uniqueMainBrands = Array.from(new Set(mainBrands))
    const mainBrandItems = uniqueMainBrands.map(
      (brand, idx) => <option key={idx} value={brand}>{brand}</option>);

    const mainModelItems = this.updateMainModels();

    const crossBrands = cords.map(cord => cord.brand);
    const uniqueCrossBrands = Array.from(new Set(crossBrands))
    const crossBrandItems = uniqueCrossBrands.map(
      (brand, idx) => <option key={idx} value={brand}>{brand}</option>);

    const crossModelItems = this.updateCrossModels();

    return(
      <div id={`ol-form-${orderId}`} className="ol-form-container hidden">
        <h4>New Order Line</h4>
        <br />
        <ul>
          {this.errors()}
        </ul>
        <div className="order-line-form" onSubmit={this.handleSubmit}>
          <div className="section-container">
            <div className="racket-section">
              <h4 className="racket-section-title section-title">Racket</h4>
              <div className="racket-order section">
                { this.racketImage() }
                <div className="racket-dropdowns">
                  <select onChange={this.update('racket_brand')} id="racket-brand">
                    <option>-- Select a Brand --</option>
                    { racketBrandItems }
                  </select>
                  <select onChange={this.updateRacketId} id="racket-model">
                    <option>-- Select a Model --</option>
                    { racketModelItems }
                  </select>
                </div>
                <div className="lower-section">
                  <h6> OR </h6>
                  <button className="button" onClick={this.navigateToRacketForm}>
                    Create New Racket</button>
                </div>
              </div>
            </div>
            <div className="strings-sections">
              <h4 className="section-title">Main String</h4>
              <div className="main-order section">
                <select onChange={this.update('main_brand')} id="main-brand">
                  <option>-- Select a Brand --</option>
                  { mainBrandItems }
                </select>
                <select onChange={this.updateMainId} id="main-model">
                  <option>-- Select a Model --</option>
                  { mainModelItems }
                </select>
                <div className="lower-section">
                <input
                  type="number"
                  value={this.state.main_tension}
                  placeholder="Main Tension (lbs.)"
                  onChange={this.update('main_tension')}
                  />
                  <h6> OR </h6>
                  <button className="button" onClick={this.navigateToStringForm}>
                    Create New String</button>
                </div>
              </div>
              <h4 className="section-title">Cross String</h4>
              <div className="cross-order section">
                <select onChange={this.update('cross_brand')} id="cross-brand">
                  <option>-- Select a Brand --</option>
                  { crossBrandItems }
                </select>
                <select onChange={this.updateCrossId} id="cross-model">
                  <option>-- Select a Model --</option>
                  { crossModelItems }
                </select>
                <input
                  type="number"
                  value={this.state.cross_tension}
                  placeholder="Cross Tension (lbs.)"
                  onChange={this.update('cross_tension')}
                  />
                <div className="lower-section">
                  <h6> OR </h6>
                  <button className="button" onClick={this.navigateToStringForm}>
                    Create New String</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ol-form-buttons">
          <button
            id="green-button"
            className="ol-button"
            onClick={this.handleSubmit}>
            Create New Order Line
          </button>
          <button
            id="cancel-button"
            className="ol-button"
            onClick={this.hideOrderLineForm.bind(this, orderId)}>
            Cancel
          </button>
        </div>
      </div>
    )
  }
}

export default withRouter(OrderLineForm);
