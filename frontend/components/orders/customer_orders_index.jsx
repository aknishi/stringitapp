import React from "react";
import CustomerOrderDetail from './customer_order_detail';
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table";
import matchSorter from 'match-sorter';
import { withRouter } from 'react-router';

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
    Header: 'No. of Rackets',
    id: "racket-count",
    accessor: order => order.orderLineIds.length,
    width: 120,
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["racket-count"] }),
    filterAll: true
  },
  {
    Header: "Store",
    id: "store-name",
    Cell: "Tennis Center Store",
    width: 170,
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["name"] }),
    filterAll: true
  },
  {
    Header: "Store Address",
    id: "store-address",
    Cell: "111 Main Ave. San Francisco, CA 94110",
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["name"] }),
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

class CustomerOrdersIndex extends React.Component {
  constructor(props) {
    super(props);
    this.navigateToOrderForm = this.navigateToOrderForm.bind(this)
  }

  componentWillMount() {
    this.props.fetchOrders();
  }

  navigateToOrderForm() {
    this.props.history.push("/orderform")
  }

  render() {
    const { orders, orderLines, fetchOrderLines, loading } = this.props;
    if (orders.length > 0) {
      return (
        <div>
          <div className="orders-container">
            <div className="table-title">
              <div className="empty-div"></div>
              <h3>My Orders</h3>
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
                SubComponent={row => {
                  const data = orderLines.filter(ol => ol.order_id === row.original.id)
                  return (
                    <div className="order-detail-container">
                      <CustomerOrderDetail
                        data={data}
                        orderId={row.original.id}
                        order={row.original}
                        loading={loading} />
                    </div>
                  );
                }}
                collapseOnDataChange={false}
              />
            </div>
          </div>
        </div>
      )
    } else {
      return (<div></div>)
    }
  }
}

export default withRouter(CustomerOrdersIndex);
