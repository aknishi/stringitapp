import React from "react";
import LoadingIcon from '../loading_icon';
import EditOrderContainer from '../orders/edit_order_container';
import OrderLinesIndexItem from './order_lines_index_item'
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table";
import matchSorter from 'match-sorter';

class OrderLinesIndex extends React.Component {
  constructor(props) {
    super(props);
    this.deleteLine = this.deleteLine.bind(this);
  }

  componentWillMount() {
    this.props.fetchOrderLines(this.props.orderId);
    this.props.fetchRackets()
    this.props.fetchCords()
  }

  deleteLine(orderLine) {
    const { destroyOrderLine } = this.props;
    if (window.confirm(`Are you sure you wish to delete order line for ${orderLine.racket.brand} ${orderLine.racket.model}?`)) {
      destroyOrderLine(orderLine);
    }
  }

  showOrderLineForm(orderId) {
    $(`#add-button-${orderId}`).addClass('hidden');
    $(`#ol-form-${orderId}`).removeClass('hidden');
  }

  render() {
    const { orderId, data, loading } = this.props

    const items = data.map( ol =>
      <OrderLinesIndexItem
        key={ol.id}
        orderLine={ol}
        deleteLine={this.deleteLine}/>
    )

    if (loading) {
      return (<LoadingIcon />)
    } else {
      return (
        <div>
          <h4>Order Detail:</h4>
          <br />
          { items }
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
