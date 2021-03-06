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
    $(`#add-button-${orderId}`).toggleClass('hidden').slideUp();
    $(`#ol-form-${orderId}`).toggleClass('hidden').slideDown();
  }

  showEditOrderLineForm(orderLineId) {
    $(`#edit-form-${orderLineId}`).toggleClass('hidden').slideDown();
  }

  orderLineForm() {
    const { orderId, admin } = this.props;
    if (admin) {
      return <OrderLineFormContainer orderId={orderId}/>
    }
  }

  render() {
    const { orderId, data, loading, admin } = this.props

    const items = data.map( ol =>
      <div key={ol.id}>
        <OrderLinesIndexItem
          orderLine={ol}
          deleteLine={this.deleteLine}
          showEditOrderLineForm={this.showEditOrderLineForm}
          admin={admin}
        />
        <EditOrderLineFormContainer orderLine={ol}/>
      </div>
    )

    // if order is cancelled disable the order index by toggling an overlay
    var disablingOverlay = document.getElementById(`dark-overlay-${orderId}`)
    if (disablingOverlay) {
      // put an overlay on the items and on the add line button
      if (admin) {
        disablingOverlay.style.height = `${(data.length*166)+54}px`;
      } else {
        // put an overlay on the items only
        disablingOverlay.style.height = `${(data.length*166)}px`;
      }
    }
    let addButton;
    if (admin) {
      addButton = (
        <button
          id={`add-button-${orderId}`}
          className="btn btn--blue"
          onClick={this.showOrderLineForm.bind(this, orderId)}
        >
          Add Line
        </button>
      );
    }

    if (loading) {
      return (<LoadingIcon />)
    } else {
      return (
        <div id="order-index-container">
          <div id={`dark-overlay-${orderId}`} className="dark-overlay hidden"></div>
          { items }
          { addButton }
          { this.orderLineForm() }
        </div>
      )
    }
  }
}

export default OrderLinesIndex;
