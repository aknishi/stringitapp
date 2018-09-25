import React from 'react';
import OrderIndexItem from './order_index_item';
import ReactTable from "react-table";
import "react-table/react-table.css";


class OrdersIndex extends React.Component {

  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    const { orders, updateOrder } = this.props;
    const orderItems = orders.map(order => {
      return(
        <OrderIndexItem key={order.id} order={order} updateOrder={updateOrder}/>
      )
    })
    return(
      <div className="table-container">
        <div className="spacing-container"></div>
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover dataTables-example">
            <thead>
              <tr>
                <th id="center" scope="col"><b>Order Number</b></th>
                <th id="center" scope="col"><b>Name</b></th>
                <th id="center" scope="col"><b>Phone</b></th>
                <th id="center" scope="col"><b>Address</b></th>
                <th id="center" scope="col"><b>Status</b></th>
                <th id="center" scope="col"><b>Buttons</b></th>
              </tr>
            </thead>
            { orderItems }
          </table>
        </div>
      </div>
    );
  }
}

export default OrdersIndex;
