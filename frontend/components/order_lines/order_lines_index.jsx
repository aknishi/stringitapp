import React from "react";
import { render } from "react-dom";
import LoadingIcon from './loading_icon';
import EditOrderContainer from '../orders/edit_order_container';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table";
import matchSorter from 'match-sorter';

class OrderLinesIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      loading: this.props.loading
    }
    this.addNewRow = this.addNewRow.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.deleteLine = this.deleteLine.bind(this);
  }

  componentWillMount() {
    this.props.fetchOrderLines(this.props.orderId).then(() => {this.setState({data: this.props.data})});
    this.props.fetchRackets()
    this.props.fetchCords()
  }

  deleteLine(orderLine) {
    const { destroyOrderLine } = this.props;
    if (window.confirm(`Are you sure you wish to delete order line for ${orderLine.racket.brand} ${orderLine.racket.model}?`)) {
      destroyOrderLine(orderLine).then(this.removeRow(orderLine));
    }
  }

  showOrderLineForm(orderId) {
    $(`#add-button-${orderId}`).addClass('hidden');
    $(`#ol-form-${orderId}`).removeClass('hidden');
  }

  addNewRow(newLine) {
    const newData = this.state.data.concat([newLine])
    this.setState({data: newData})
  }

  removeRow(orderLine) {
    const newData = this.state.data
    const idx = newData.indexOf(orderLine);
    newData.splice(idx, 1)
    this.setState({data: newData})
  }

  render() {
    const { orderId, data, loading } = this.props

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
      },
      {
        Header: "",
        id: "delete-button",
        maxWidth: 40,
        Cell: row => {
          return <img src={window.recycleBinIconURL} className="trash-icon" alt="del" onClick={this.deleteLine.bind(this, row.original)}/>
          }
      }
    ];

    if (loading) {
      return (<LoadingIcon />)
    } else {
      return (
        <div>
          <h4>Order Detail:</h4>
          <br />
          <ReactTable
            loading={this.state.loading}
            data={this.state.data}
            columns={orderLineColumns}
            defaultPageSize={this.state.data.length}
            showPagination={false}
            style={{ textAlign: "center" }}
            className="order-lines-table"
            manual
          />
          <button
            id={`add-button-${orderId}`}
            className="add-button green-button"
            onClick={this.showOrderLineForm.bind(this, orderId)}
            >Add Line</button>
          <EditOrderContainer orderId={orderId} onLineSubmit={this.addNewRow}/>
        </div>
      )
    }
  }
}

export default OrderLinesIndex;
