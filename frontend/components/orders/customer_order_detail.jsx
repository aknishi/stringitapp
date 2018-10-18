import React from 'react'
import { withRouter } from 'react-router';
import OrderLinesIndexContainer from '../order_lines/order_lines_index_container';
import LoadingBar from '../loading_bar';

class CustomerOrderDetail extends React.Component {
  constructor(props){
    super(props)

    this.loadingBar = this.loadingBar.bind(this);
  }

  loadingBar() {
    const { loading } = this.props;
    if ( loading ) {
      return(
        <LoadingBar />
      )
    }
  }

  showTextbox(order) {
    $(`#textbox-${order.id}`).removeClass("hidden");
    $(`#comment-button-${order.id}`).addClass("hidden");
    $(`#red-comment-${order.id}`).addClass("hidden");
  }

  hideTextbox(order) {
    $(`#textbox-${order.id}`).addClass("hidden");
    $(`#comment-button-${order.id}`).removeClass("hidden");
    $(`#red-comment-${order.id}`).removeClass("hidden");
  }

  orderStatusItems() {
    const { order } = this.props;
    if ( order.status === "Cancelled" ) {
      return (
        <div>
          <div className="cancel-order">
            <input
              type="radio"
              name="status"
              value="Cancel Order"
              id={`Cancelled-${order.id}`}
              />
            <label id="cancelled-label"></label>
          </div>
        </div>
      )
    } else {
      return(
        <div className="customer-order-status-container">
          <div className="customer-status-option">
            <input
              type="radio"
              name="status"
              value="Pending"
              id={`Pending-${order.id}`}
              />
            <label id="pending-label">Pending</label>
          </div>
          <div className="customer-status-option">
            <input
              type="radio"
              name="status"
              value="In_Progress"
              id={`In_Progress-${order.id}`}
              />
            <label id="in-progress-label">In Progress</label>
          </div>
          <div className="customer-status-option">
            <input
              type="radio"
              name="status"
              value="Ready"
              id={`Ready-${order.id}`}
              />
            <label id="ready-label">Ready</label>
          </div>
          <div className="customer-status-option">
            <input
              type="radio"
              name="status"
              value="Picked_up"
              id={`Picked_up-${order.id}`}
              />
            <label id="picked-up-label">Picked Up</label>
          </div>
        </div>
      )
    }
  }

  render() {
    const { data, orderId, order, changeStatus } = this.props

    $(".customer-status-option").prop("checked", false);
    $(`#${order.status}-${order.id}`).prop("checked", true);

    if (order.status === "Cancelled") {
      $(`#dark-overlay-${order.id}`).removeClass("hidden");
      $(`add-button-${order.id}`).addClass("hidden");
    } else {
      $(`#dark-overlay-${order.id}`).addClass("hidden");
      $(`add-button-${order.id}`).removeClass("hidden");
    }

    return (
      <div>
        <div className="customer-status-options">
          <h4 className="detail-title status-title">Status:</h4>
          { this.orderStatusItems() }
        </div>
        { this.loadingBar() }
        <br />
        <OrderLinesIndexContainer data={data} orderId={order.id}/>
      </div>
    )
  }
}

export default withRouter(CustomerOrderDetail);
