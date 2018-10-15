import React from 'react';

class OrderLineForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      order_id: this.props.orderId,
      racket_id: null,
      racket_brand: "",
      racket_model: "",
      main_cord_id: null,
      main_tension: "",
      main_gauge: "",
      main_composition: "",
      main_brand: "",
      main_model: "",
      cross_cord_id: null,
      cross_tension: "",
      cross_gauge: "",
      cross_composition: "",
      cross_brand: "",
      cross_model: ""
    }
    this.updateRacketId = this.updateRacketId.bind(this);
    this.updateMainCordId = this.updateMainCordId.bind(this);
    this.updateCrossCordId = this.updateCrossCordId.bind(this);
    this.updateIds = this.updateIds.bind(this);
    this.updateRacketModels = this.updateRacketModels.bind(this);
    this.updateMainModels = this.updateMainModels.bind(this);
    this.updateCrossModels = this.updateCrossModels.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.processNewOrderLine = this.processNewOrderLine.bind(this);
  }

  updateRacketModels(e) {
    const { rackets } = this.props;
    const racketModels = rackets.filter(racket => racket.brand === this.state.racket_brand).map(
      racket => <option key={racket.id} value={racket.model}>{racket.model}</option>);
    return racketModels;
  }

  updateMainModels(e) {
    const { cords } = this.props;
    const mainModels = cords.filter(cord => cord.brand === this.state.main_brand).map(
      cord => <option key={cord.id} value={cord.model}>{cord.model}</option>);
    return mainModels;
  }

  updateCrossModels(e) {
    const { cords } = this.props;
    const crossModels = cords.filter(cord => cord.brand === this.state.cross_brand).map(
      cord => <option key={cord.id} value={cord.model}>{cord.model}</option>);
    return crossModels;
  }

  updateRacketId(callback) {
    const { rackets } = this.props;
    const racket = rackets.filter(
      racket => ((racket.brand === this.state.racket_brand) && (racket.model === this.state.racket_model)));
    const racketId = racket[0].id
    this.setState({ racket_id: racketId })
    callback();
  }

  updateMainCordId(callback) {
    const { cords } = this.props;
    const mainCord = cords.filter(
      cord => ((cord.gauge === this.state.main_gauge) && (cord.composition === this.state.main_composition)));
    const mainCordId = mainCord[0].id
    this.setState({ main_cord_id: mainCordId })
    callback();
  }

  updateCrossCordId(callback) {
    const { cords } = this.props;
    const crossCord = cords.filter(
      cord => ((cord.gauge === this.state.cross_gauge) && (cord.composition === this.state.cross_composition)));
    const crossCordId = crossCord[0].id
    this.setState({ cross_cord_id: crossCordId })
    setTimeout(callback, 100);
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  updateIds(callback) {
    this.updateRacketId( () => {
      this.updateMainCordId( () => {
        this.updateCrossCordId(() => callback() );
      });
    });
  }

  hideOrderLineForm(orderId) {
    $(`#add-button-${orderId}`).removeClass('hidden');
    $(`#ol-form-${orderId}`).addClass('hidden');
  }

  handleSubmit() {
    this.updateIds(() => this.processNewOrderLine());
  }

  processNewOrderLine() {
    const { createOrderLine, orderId } = this.props;
    let orderLine = Object.assign({}, this.state);
    delete orderLine.racket_model;
    delete orderLine.racket_brand;
    delete orderLine.main_gauge;
    delete orderLine.main_composition;
    delete orderLine.cross_composition;
    delete orderLine.main_brand;
    delete orderLine.main_model;
    delete orderLine.cross_brand;
    delete orderLine.cross_model;
    createOrderLine(orderLine).then(
      (response) => {this.props.addRow(response.orderLine)}).then(
        this.hideOrderLineForm(orderId));
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

    const cordCompositions = cords.map(cord => cord.composition);
    const uniqueCompositions = Array.from(new Set(cordCompositions))
    const compositionOptions = uniqueCompositions.map(
      (composition, idx) => <option key={idx} value={composition}>{composition}</option>);

    return(
      <div id={`ol-form-${orderId}`} className="ol-form-container hidden">
        <h4>New Order Line</h4>
        <br />
        <div className="order-line-form" onSubmit={this.handleSubmit}>
          <div className="item-forms">
            <h4 className="section-title">Racket</h4>
            <div className="racket-order section">
              <div>
                <select onChange={this.update('racket_brand')} id="racket-brand">
                  <option>-- Select a Brand --</option>
                  { racketBrandItems }
                </select>
                <select onChange={this.update('racket_model')}>
                  <option>-- Select a Model --</option>
                  { racketModelItems }
                </select>
              </div>
              <h6> OR </h6>
              <button className="button">Create New Racket</button>
            </div>
            <h4 className="section-title">Main String</h4>
            <div className="main-order section">
              <div>
                <input
                  type="number"
                  value={this.state.main_tension}
                  placeholder="Main Tension"
                  onChange={this.update('main_tension')}
                  />
                <input
                  type="text"
                  value={this.state.main_gauge}
                  placeholder="Gauge"
                  onChange={this.update('main_gauge')}
                  />
                <select onChange={this.update('main_composition')}>
                  <option>-- Select Composition --</option>
                  { compositionOptions }
                </select>
              </div>
              <div>
                <select onChange={this.update('main_brand')} id="main-brand">
                  <option>-- Select a Brand --</option>
                  { mainBrandItems }
                </select>
                <select onChange={this.update('main_model')}>
                  <option>-- Select a Model --</option>
                  { mainModelItems }
                </select>
              </div>
              <h6> OR </h6>
              <button className="button">Create New String</button>
            </div>
            <h4 className="section-title">Cross String</h4>
            <div className="cross-order section">
              <div>
                <input
                  type="number"
                  value={this.state.cross_tension}
                  placeholder="Cross Tension"
                  onChange={this.update('cross_tension')}
                  />
                <input
                  type="text"
                  value={this.state.cross_gauge}
                  placeholder="Gauge"
                  onChange={this.update('cross_gauge')}
                  />
                <select onChange={this.update('cross_composition')}>
                  <option>-- Select Composition --</option>
                  { compositionOptions }
                </select>
              </div>
              <div>
                <select onChange={this.update('cross_brand')} id="cross-brand">
                  <option>-- Select a Brand --</option>
                  { crossBrandItems }
                </select>
                <select onChange={this.update('cross_model')}>
                  <option>-- Select a Model --</option>
                  { crossModelItems }
                </select>
              </div>
              <h6> OR </h6>
              <button className="button">Create New String</button>
            </div>
          </div>
        </div>
        <div>
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

export default OrderLineForm;
