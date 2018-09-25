import React from 'react';
import OrderDetailContainer from './order_detail_container';

class OrderIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { detail: false };
    this.toggleDetail = this.toggleDetail.bind(this);
  }

  toggleDetail(e) {
    e.preventDefault();
    this.setState({
      detail: !this.state.detail
    });
  }

  render(){
    const { order } = this.props;
    let detail;
    if (this.state.detail) {
      detail = <OrderDetailContainer order={order} />;
    }
    return(
      <tbody className="table-row">
        <tr key={order.id} onClick={this.toggleDetail}>
          <td>{order.order_number}</td>
          <td>{order.customer.name}</td>
          <td>{order.customer.phone_number}</td>
          <td>{order.customer.address}</td>
          <td><span className="badge-pill badge-primary">{order.status}</span></td>
          <td>Some buttons</td>
        </tr>
        <tr>
          { detail }
        </tr>
      </tbody>
    )
  }
}

export default OrderIndexItem;
