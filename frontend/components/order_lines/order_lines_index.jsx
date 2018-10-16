import React from "react";
import LoadingIcon from '../loading_icon';
import OrderLineFormContainer from './order_line_form_container';
import EditOrderLineFormContainer from './edit_order_line_form_container';
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
    $(`#add-button-${orderId}`).stop().css('display','hidden').slideUp();
    $(`#ol-form-${orderId}`).stop().css('display','block').hide().slideDown();
  }

  showEditOrderLineForm(orderLineId) {
    $(`#edit-form-${orderLineId}`).stop().css('display','block').hide().slideDown();
  }

  render() {
    const { orderId, data, loading } = this.props

    const items = data.map( ol =>
      <div key={ol.id}>
        <OrderLinesIndexItem
          orderLine={ol}
          deleteLine={this.deleteLine}
          showEditOrderLineForm={this.showEditOrderLineForm}/>
        <EditOrderLineFormContainer orderLine={ol}/>
      </div>
    )

    // if order is cancelled disable the order index by toggling an overlay
    var disablingOverlay = document.getElementById(`dark-overlay-${orderId}`)
    if (disablingOverlay) {
      disablingOverlay.style.height = `${(data.length*166)+42}px`
    }

    if (loading) {
      return (<LoadingIcon />)
    } else {
      return (
        <div id="order-index-container">
          <div id={`dark-overlay-${orderId}`} className="dark-overlay hidden"></div>
          { items }
          <button
            id={`add-button-${orderId}`}
            className="add-button blue-button"
            onClick={this.showOrderLineForm.bind(this, orderId)}
            >Add Line</button>
          <OrderLineFormContainer orderId={orderId}/>
        </div>
      )
    }
  }
}

export default OrderLinesIndex;
