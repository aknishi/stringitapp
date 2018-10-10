import React from "react";
import { render } from "react-dom";
import OrderLinesIndexContainer from '../order_lines/order_lines_index_container';
import EditOrderContainer from './edit_order_container';
import { withRouter, Link } from 'react-router';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table";
import matchSorter from 'match-sorter';

const orderColumns = [
  {
    Header: "Order Number",
    id: "order-number",
    accessor: "order_number",
    width: 150,
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["order-number"] }),
    filterAll: true
  },
  {
    Header: "Name",
    id: "name",
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
    minWidth: 300,
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["address"] }),
    filterAll: true
  },
  {
    Header: 'Status',
    accessor: "status",
    width: 130,
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

const orderLineColumns = [
  {
    Header: "#",
    id: "row",
    maxWidth: 50,
    Cell: (row) => row.index+1
  },
  {
    Header: "Racket",
    columns: [
      {
        Header: "Brand",
        id: "racketbrand",
        accessor: d => d.racket.brand
      },
      {
        Header: "Model",
        id: "racketmodel",
        accessor: d => d.racket.model
      }
    ],
    width: 200
  },
  {
    Header: "Main String",
    columns: [
      {
        Header: "Tension",
        id: "maintension",
        accessor: d => d.main_tension,
        width: 100
      },
      {
        Header: "Gauge",
        id: "maingauge",
        accessor: d => d.main_cord.gauge,
        width: 100
      },
      {
        Header: "Composition",
        id: "main-composition",
        accessor: d => d.main_cord.composition,
        width: 100
      }
    ],
    width: 100
  },
  {
    Header: "Cross String",
    columns: [
      {
        Header: "Tension",
        id: "cross-tension",
        accessor: d => d.cross_tension,
        width: 100
      },
      {
        Header: "Gauge",
        id: "cross-gauge",
        accessor: d => d.cross_cord.gauge,
        width: 100
      },
      {
        Header: "Composition",
        id: "cross-composition",
        accessor: d => d.cross_cord.composition,
        width: 100
      }
    ],
    width: 100
  }
];

class OrdersIndex extends React.Component {
  constructor(props) {
    super(props);

    this.navigateToOrderForm = this.navigateToOrderForm.bind(this)
    // this.fetchLines = this.fetchLines.bind(this);
  }

  // fetchLines() {
  //   const { orders } = this.props;
  //   orders.map(order => this.props.fetchOrderLines(order.id))
  // }

  componentWillMount() {
     this.props.fetchOrders()
  }

  navigateToOrderForm() {
    this.props.history.push("/orderform")
  }

  showOrderLineForm(orderId) {
    $(`#add-button-${orderId}`).addClass('hidden');
    $(`#ol-form-${orderId}`).removeClass('hidden');
  }

  render() {
    const { orders, orderLines, fetchOrderLines } = this.props;
    if (orders.length > 0) {
      return (
        <div>
          <div className="spacing-container"></div>
          <div className="orders-container">
            <div className="table-title">
              <button
                className="new-order-button"
                onClick={this.navigateToOrderForm}>
                New Order
              </button>
              <h3>Stringing Orders</h3>
              <button className="print-button">Print</button>
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
                  const items = orderLines.filter(od => od.order_id === row.original.id)
                  return (
                    <div className="order-detail-container">
                      <OrderLinesIndexContainer data={items} orderId={row.original.id}/>
                      <br />
                    </div>
                  );
                }}
                collapseOnDataChange={false}
              />
              <br />
            </div>
          </div>
        </div>
      )
    } else {
      return (<div></div>)
    }
  }
}

export default withRouter(OrdersIndex);
