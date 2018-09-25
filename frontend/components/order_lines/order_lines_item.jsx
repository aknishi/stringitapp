import React from 'react';
import merge from 'lodash/merge';

class OrderLinesItem extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { orderLine } = this.props;
    return (
      <tr className="order-line-item">
        <td>Racket</td>
        <td>Main String</td>
        <td>Cross String</td>
        <div className="racket-info">
          <h3>Racket</h3>
          <h4>{`Brand: ${orderLine.racket.brand}`}</h4>
          <h4>{`Model: ${orderLine.racket.model}`}</h4>
        </div>
        <div className="cords-info">
          <div className="main-cord-info">
            <h3>Main Cord </h3>
            <h4>{`Tension: ${orderLine.main_tension}`}</h4>
            <h4>{`Gauge: ${orderLine.main_cord.gauge}`}</h4>
            <h4>{`Brand: ${orderLine.main_cord.brand}`}</h4>
            <h4>{`Model: ${orderLine.main_cord.model}`}</h4>
            <h4>{`Composition ${orderLine.main_cord.composition}`}</h4>
            <h4>{`Length: ${orderLine.main_cord.length}`}</h4>
          </div>
          <div className="cross-cord-info">
            <h3>Cross Cord </h3>
            <h4>{`Tension: ${orderLine.cross_tension}`}</h4>
            <h4>{`Gauge: ${orderLine.cross_cord.gauge}`}</h4>
            <h4>{`Brand: ${orderLine.cross_cord.brand}`}</h4>
            <h4>{`Model: ${orderLine.cross_cord.model}`}</h4>
            <h4>{`Composition ${orderLine.cross_cord.composition}`}</h4>
            <h4>{`Length: ${orderLine.cross_cord.length}`}</h4>
          </div>
        </div>
        <div className="order-line-buttons">
          <button
            className="delete-button"
            onClick={this.props.destroyOrderLine}>
            Delete
          </button>
        </div>
      </tr>
    );
  }
}


export default OrderLinesItem;
