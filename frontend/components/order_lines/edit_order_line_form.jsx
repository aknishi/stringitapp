import React from 'react';
import { withRouter } from "react-router"

class EditOrderLineForm extends React.Component {
  constructor(props){
    super(props)
    const { racket, cross_cord, main_cord } = this.props.orderLine;
    const { orderLine } = this.props;
    this.state = {
      id: orderLine.id,
      order_id: orderLine.order_id,
      racket_id: racket.id,
      racket_brand: racket.brand,
      racket_model: racket.model,
      racket_image: racket.image,
      main_cord_id: main_cord.id,
      main_tension: orderLine.main_tension,
      main_brand: main_cord.brand,
      main_model: main_cord.model,
      cross_cord_id: cross_cord.id,
      cross_tension: orderLine.cross_tension,
      cross_brand: cross_cord.brand,
      cross_model: cross_cord.model
    }
    this.racketImage = this.racketImage.bind(this);
    this.updateRacketId = this.updateRacketId.bind(this);
    this.updateMainId = this.updateMainId.bind(this);
    this.updateCrossId = this.updateCrossId.bind(this);
    this.updateRacketModels = this.updateRacketModels.bind(this);
    this.updateMainModels = this.updateMainModels.bind(this);
    this.updateCrossModels = this.updateCrossModels.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  racketImage() {
    if (this.state.racket_image !== "") {
      return (
        <div className="edit-racket-order-image">
          <img src={this.state.racket_image} />
        </div>
      )
    } else {
      return (
        <div className="racket-order-image"></div>
      )
    }
  }

  updateRacketModels(e) {
    const { rackets } = this.props;
    const racketModels = rackets.filter(racket => racket.brand === this.state.racket_brand).map(
      racket => ( <option
                    key={racket.id}
                    value={racket.model}
                    data-racketid={racket.id}
                    data-image={racket.image}
                    selected={this.state.racket_model === racket.model}>
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
                data={cord.id}
                selected={this.state.main_model === cord.model}>
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
                data={cord.id}
                selected={this.state.cross_model === cord.model}>
                {cord.model} {cord.gauge} {cord.composition} {cord.color}
              </option>);
    return crossModels;
  }

  updateRacketId(e) {
    const { orderLine } = this.props;
    var sel = $(`#racket-model-${orderLine.id}`);
    var selected = sel[0].options[sel[0].options.selectedIndex]
    const racketId = selected.getAttribute('data-racketid');
    const imageUrl = selected.getAttribute('data-image');
    this.setState({ ["racket_model"]: e.currentTarget.value });
    this.setState({ ["racket_image"]: imageUrl });
    this.setState({ ["racket_id"]: racketId });
  }

  updateMainId(e) {
    const { orderLine } = this.props;
    var sel = $(`#main-model-${orderLine.id}`);
    var selected = sel[0].options[sel[0].options.selectedIndex]
    const cordId = selected.getAttribute('data');
    this.setState({ ["main_model"]: e.currentTarget.value });
    this.setState({ ["main_cord_id"]: cordId });
  }

  updateCrossId(e) {
    const { orderLine } = this.props;
    var sel = $(`#cross-model-${orderLine.id}`);
    var selected = sel[0].options[sel[0].options.selectedIndex]
    const cordId = selected.getAttribute('data');
    this.setState({ ["cross_model"]: e.currentTarget.value });
    this.setState({ ["cross_cord_id"]: cordId });
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  hideEditOrderLineForm(orderLineId) {
    $(`#edit-form-${orderLineId}`).stop().css('display','hidden').slideUp();
    this.props.clearErrors();
  }

  handleSubmit() {
    const { updateOrderLine, orderLine } = this.props;
    let updatedOrderLine = Object.assign({}, this.state);
    delete updatedOrderLine.racket_model;
    delete updatedOrderLine.racket_brand;
    delete updatedOrderLine.racket_image;
    delete updatedOrderLine.main_brand;
    delete updatedOrderLine.main_model;
    delete updatedOrderLine.cross_brand;
    delete updatedOrderLine.cross_model;
    updateOrderLine(updatedOrderLine).then(
        () => this.hideEditOrderLineForm(orderLine.id));
  }

  errors() {
    if (this.props.errors) {
      return (
        this.props.errors.map(error => <li className='errors' key={error}>{error}</li>)
      );
    }
  }

  render() {
    const { rackets, cords, orderLine } = this.props;
    const racketBrands = rackets.map(racket => racket.brand);
    const uniqueRacketBrands = Array.from(new Set(racketBrands))
    const racketBrandItems = uniqueRacketBrands.map(
      (brand, idx) => (
        <option key={idx} value={brand} selected={this.state.racket_brand == brand}>{brand}</option>
      ));

    const racketModelItems = this.updateRacketModels();

    const mainBrands = cords.map(cord => cord.brand);
    const uniqueMainBrands = Array.from(new Set(mainBrands))
    const mainBrandItems = uniqueMainBrands.map(
      (brand, idx) => (
        <option key={idx} value={brand} selected={this.state.main_brand === brand}>{brand}</option>
      ));

    const mainModelItems = this.updateMainModels();

    const crossBrands = cords.map(cord => cord.brand);
    const uniqueCrossBrands = Array.from(new Set(crossBrands))
    const crossBrandItems = uniqueCrossBrands.map(
      (brand, idx) => (
        <option key={idx} value={brand} selected={this.state.cross_brand === brand}>{brand}</option>
      ));

    const crossModelItems = this.updateCrossModels();

    return(
      <div id={`edit-form-${orderLine.id}`} className="form-container ol-form-container hidden">
        <h4>Edit Order Line</h4>
        <br />
        <ul>
          {this.errors()}
        </ul>
        <div className="=order-line-form" onSubmit={this.handleSubmit}>
          <div className="section-container">
            <div className="section__left-section">
              <h4 className="racket-section-title section__title">Racket</h4>
              <div className="edit-racket-order section">
                { this.racketImage() }
                <div className="racket-dropdowns">
                  <select onChange={this.update('racket_brand')}>
                    <option>-- Select a Brand --</option>
                    { racketBrandItems }
                  </select>
                  <select onChange={this.updateRacketId} id={`racket-model-${orderLine.id}`}>
                    <option>-- Select a Model --</option>
                    { racketModelItems }
                  </select>
                </div>
              </div>
            </div>
            <div className="section__strings-section">
              <h4 className="section__title">Main String</h4>
              <div className="section section__strings-section__main">
                <select onChange={this.update('main_brand')}>
                  <option>-- Select a Brand --</option>
                  { mainBrandItems }
                </select>
                <select onChange={this.updateMainId} id={`main-model-${orderLine.id}`}>
                  <option>-- Select a Model --</option>
                  { mainModelItems }
                </select>
                <input
                  type="number"
                  value={this.state.main_tension}
                  placeholder="Main Tension (lbs.)"
                  onChange={this.update('main_tension')}
                  />
              </div>
              <h4 className="section__title">Cross String</h4>
              <div className="section section__strings-section__cross">
                <select onChange={this.update('cross_brand')}>
                  <option>-- Select a Brand --</option>
                  { crossBrandItems }
                </select>
                <select onChange={this.updateCrossId} id={`cross-model-${orderLine.id}`}>
                  <option>-- Select a Model --</option>
                  { crossModelItems }
                </select>
                <input
                  type="number"
                  value={this.state.cross_tension}
                  placeholder="Cross Tension (lbs.)"
                  onChange={this.update('cross_tension')}
                  />
              </div>
            </div>
          </div>
        </div>
        <div className="ol-form-buttons">
          <button
            id="ol-button"
            className="btn btn--blue"
            onClick={this.handleSubmit}>
            Update Order Line
          </button>
          <button
            id="ol-button"
            className="btn btn--grey"
            onClick={this.hideEditOrderLineForm.bind(this, orderLine.id)}>
            Cancel
          </button>
        </div>
      </div>
    )
  }
}

export default withRouter(EditOrderLineForm);
