import React from 'react'

const OrderLinesIndexItem = (props) => {
  const { orderLine, deleteLine } = props
  const racket = orderLine.racket;
  const main = orderLine.main_cord;
  const cross = orderLine.cross_cord;
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
        <h4>Main String</h4>
        <h6><b>Tension:</b> {orderLine.main_tension}</h6>
        <h6><b>Brand:</b> {main.brand}</h6>
        <h6><b>Model:</b> {main.model}</h6>
        <h6><b>Gauge:</b> {main.gauge}</h6>
        <h6><b>Composition:</b> {main.composition}</h6>
        <h6><b>Color:</b> {main.color}</h6>
      </div>
      <div className="string-info">
        <h4>Cross String</h4>
        <h6><b>Tension:</b> {orderLine.main_tension}</h6>
        <h6><b>Brand:</b> {cross.brand}</h6>
        <h6><b>Model:</b> {cross.model}</h6>
        <h6><b>Gauge:</b> {cross.gauge}</h6>
        <h6><b>Composition:</b> {cross.composition}</h6>
        <h6><b>Color:</b> {cross.color}</h6>
      </div>
      <button className="delete-line-button button" onClick={() => deleteLine(orderLine)}>
        Delete
      </button>
    </div>
  )
}

export default OrderLinesIndexItem;
