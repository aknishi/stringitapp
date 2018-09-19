import React from 'react';

class OrdersIndex extends React.Component {

  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    const { orders } = this.props;
    const orderItems = orders.map(order => {
      return(
        <tr key={order.id}>
          <td>{order.order_number}</td>
          <td>{order.customer.name}</td>
          <td>{order.customer.phone_number}</td>
          <td>{order.customer.address}</td>
          <td><span class="badge-pill badge-primary">{order.status}</span></td>
          <td>Some buttons</td>
        </tr>
      )
    })
    return(
      <div className="table-container">
        <div className="spacing-container"></div>
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover dataTables-example">
            <thead>
              <tr>
                <th scope="col">Order Number</th>
                <th scope="col">Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Address</th>
                <th scope="col">Status</th>
                <th scope="col">Buttons</th>
              </tr>
            </thead>
            <tbody>
              { orderItems }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default OrdersIndex;
