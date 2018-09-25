import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table";

const orderColumns = [
  {
    Header: "Order Number",
    accessor: "order_number",
    width: 150
  },
  {
    Header: "Name",
    id: "name",
    accessor: order => order.customer.name
  },
  {
    Header: 'Phone Number',
    id: "phoneNumber",
    accessor: order => order.customer.phone_number,
    width: 120
  },
  {
    Header: 'Address',
    id: "address",
    accessor: order => order.customer.address,
    minWidth: 300
  },
  {
    Header: 'Status',
    accessor: "status",
    width: 130
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

    this.onRowClick = this.onRowClick.bind(this);
    this.fetchLines = this.fetchLines.bind(this);
  }

  fetchLines() {
    const { orders } = this.props;
    console.log(orders);
    orders.map(order => this.props.fetchOrderLines(order.id))
  }

  componentWillMount() {
     this.props.fetchOrders().then(setTimeout(this.fetchLines, 1000))
  }

  onRowClick(state, rowInfo, column, instance) {
    return {
      onClick: e => {
        console.log("clicked");
      }
    }
  }

  render() {
    const { orders, orderLines } = this.props;
    if (orders.length > 0) {
      return (
        <div>
          <div className="spacing-container"></div>
          <div className="table-container">
            <ReactTable
              data={orders}
              columns={orderColumns}
              defaultPageSize={10}
              className="-striped -highlight"
              SubComponent = {row => {
                const items = orderLines.filter(od => od.order_id === row.original.id)
            return (
              <div style={{ padding: "20px" }}>
                <h4>Order Detail:</h4>
                <br />
                <ReactTable
                  data={items}
                  columns={orderLineColumns}
                  defaultPageSize={items.length}
                  showPagination={false}
                  style={{ textAlign: "center" }}
                />
              </div>
            );
          }}
              />
            <br />
          </div>
        </div>
      )
    } else {
      return (<div></div>)
    }
  }
}

export default OrdersIndex;
