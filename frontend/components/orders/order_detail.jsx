import React from 'react'
import OrderLinesContainer from '../order_lines/order_lines_container';

class OrderDetail extends React.Component {

  componentWillMount() {
    this.props.fetchOrderLines();
  }

  render() {
    const { order } = this.props;
    return(
      <div className="order-detail-container">
        <OrderLinesContainer orderId={order.id} />
      </div>
    )
  }
}

export default OrderDetail;
