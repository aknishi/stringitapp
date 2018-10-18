import React from 'react'

const OrderLinesIndexItem = (props) => {
  const { orderLine, deleteLine, showEditOrderLineForm, admin } = props
  const racket = orderLine.racket;
  const main = orderLine.main_cord;
  const cross = orderLine.cross_cord;
  let olButtons;
  if (admin) {
    olButtons= (
      <div className="ol-edit-buttons">
        <button className="delete-line-button button" onClick={() => showEditOrderLineForm(orderLine.id)}>
          Edit
        </button>
        <button className="delete-line-button button" onClick={() => deleteLine(orderLine)}>
          Delete
        </button>
      </div>
    )
  }
  return (
    <div className="ol-index-item">
      <div className="racket-info-container">
        <img className="ol-racket-image" src={racket.image}></img>
        <div className="racket-info">
          <h5>{racket.brand}</h5>
          <h6>{racket.model}</h6>
        </div>
      </div>
      <div className="string-info">
        <h4>Main Tension: {orderLine.main_tension} lbs.</h4>
        <h5>{main.brand} {main.model} {main.gauge}</h5>
        <h6><b>Gauge:</b> {main.gauge}</h6>
        <h6><b>Composition:</b> {main.composition}</h6>
        <h6><b>Color:</b> {main.color}</h6>
      </div>
      <div className="string-info">
        <h4>Cross Tension: {orderLine.cross_tension} lbs.</h4>
        <h5>{cross.brand} {cross.model} {cross.gauge}</h5>
        <h6><b>Gauge:</b> {cross.gauge}</h6>
        <h6><b>Composition:</b> {cross.composition}</h6>
        <h6><b>Color:</b> {cross.color}</h6>
      </div>
      { olButtons }
    </div>
  )
}

export default OrderLinesIndexItem;
