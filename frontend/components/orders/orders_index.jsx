import React from "react";
import OrderDetail from './order_detail';
import LoadingBar from '../loading_bar';
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table";
import matchSorter from 'match-sorter';

const orderColumns = [
  {
    Header: "Order Number",
    id: "order-number",
    accessor: "order_number",
    width: 120,
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["order-number"] }),
    filterAll: true
  },
  {
    Header: "Date",
    id: "order-date",
    accessor: "order_date",
    width: 120,
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["order-date"] }),
    filterAll: true
  },
  {
    Header: "Name",
    id: "name",
    width: 140,
    accessor: order => order.customer.name,
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["name"] }),
    filterAll: true
  },
  {
    Header: 'Phone Number',
    id: "phoneNumber",
    accessor: order => order.customer.phone_number,
    width: 120,
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["phoneNumber"] }),
    filterAll: true
  },
  {
    Header: 'Address',
    id: "address",
    accessor: order => order.customer.address,
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["address"] }),
    filterAll: true
  },
  {
    Header: 'Status',
    id: "status",
    accessor: order => {
      if (order.status == "In_Progress") { return "In Progress" }
      if (order.status == "Picked_up") { return "Picked Up" }
      else return order.status
    },
    width: 110,
    Filter: ({ filter, onChange }) =>
      <select
        onChange={event => onChange(event.target.value)}
        style={{ width: "100%" }}
        value={filter ? filter.value : " "}
      >
        <option value="">Show All</option>
        <option value="Pending">Pending</option>
        <option value="Cancelled">Cancelled</option>
        <option value="In_Progress">In Progress</option>
        <option value="Ready">Ready</option>
        <option value="Picked_up">Picked Up</option>
      </select>
  }
];

class OrdersIndex extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   expanded: {}
    // }
    this.navigateToOrderForm = this.navigateToOrderForm.bind(this)
  }

  componentWillMount() {
     this.props.fetchOrders();
     this.props.fetchUsers();
  }

  navigateToOrderForm() {
    this.props.history.push("/orderform")
  }

  // handleRowExpanded(rowsState, index) {
  //   this.setState({
  //     expanded: {
  //       [index[0]]: !this.state.expanded[index[0]],
  //     },
  //   });
  // }

  render() {
    const { orders, orderLines, updateOrder, loadingOrders, loadingSingleOrder } = this.props;
    if (loadingOrders) {
      return (
        <div>
          <div className="loading-spacing-container"></div>
          <LoadingBar />
        </div>
      )
    } else {
      return (
        <div>
          <div className="spacing-container"></div>
          <div className="orders-container">
            <div className="table-title">
              <button
                className="new-order-button blue-button"
                onClick={this.navigateToOrderForm}>
                New Order
              </button>
              <h3>Stringing Orders</h3>
              <div className="empty-div"></div>
            </div>
            <div className="table-container">
              <ReactTable
                data={orders}
                filterable
                defaultFilterMethod={(filter, row) =>
                  String(row[filter.id]) === filter.value}
                columns={orderColumns}
                defaultPageSize={10}
                className="-striped -highlight"
                SubComponent = {row => {
                  const data = orderLines.filter(ol => ol.order_id === row.original.id)
                  return (
                    <div className="order-detail-container">
                      <OrderDetail
                        data={data}
                        orderId={row.original.id}
                        order={row.original}
                        changeStatus={this.changeStatus}
                        updateOrder={updateOrder}
                        loading={loadingSingleOrder}/>
                    </div>
                  );
                }}
                collapseOnDataChange={false}
              />
            </div>
          </div>
        </div>
      )
    }
  }
}

export default OrdersIndex;
