import React from 'react'
import { withRouter } from 'react-router';
import OrderLinesIndexContainer from '../order_lines/order_lines_index_container';
import LoadingBar from '../loading_bar';

class OrderDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: this.props.order.comments,
      commentDisabled: true
    }

    this.changeOrderStatus = this.changeOrderStatus.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.editComment = this.editComment.bind(this);
    this.loadingBar = this.loadingBar.bind(this);
    this.navigateToCustomerEdit = this.navigateToCustomerEdit.bind(this);
    this.toggleEditComments = this.toggleEditComments.bind(this);
  }

  changeOrderStatus(order, status) {
    const { updateOrder } = this.props;
    const updatedOrder = Object.assign({}, order)
    updatedOrder.status = status;
    if (status === "Ready") {
      if (window.confirm(`Changing the status to "Ready" will send an email notification to the client. Do you wish to continue?`)) {
        updateOrder(updatedOrder);
      }
    } else {
      updateOrder(updatedOrder);
    }
  }

  navigateToCustomerEdit(customerId) {
    this.props.history.push(`/users/${customerId}/edit`)
  }

  loadingBar() {
    const { loading } = this.props;
    if (loading) {
      return (
        <LoadingBar />
      )
    }
  }

  toggleEditComments() {
    const { orderId } = this.props;
    $(`#update-comment-button-${orderId}`).toggleClass("hidden");
    $(`#edit-cancel-button-${orderId}`).toggleClass("hidden");
    $(`#edit-comment-button-${orderId}`).toggleClass("hidden");
    $(`#comment-textbox-${orderId}`).toggleClass("greybox")
  }

  editComment() {
    const { orderId } = this.props;
    this.setState({ commentDisabled: false });
    this.toggleEditComments();
  }

  handleComment() {
    const { updateOrder, order, orderId } = this.props;
    const updatedOrder = Object.assign({}, order);
    updatedOrder.comments = this.state.comments;
    updateOrder(updatedOrder).then(() => {
      $(`#update-comment-button-${orderId}`).toggleClass("hidden");
      $(`#edit-cancel-button-${orderId}`).toggleClass("hidden");
      $(`#edit-comment-button-${orderId}`).toggleClass("hidden");
      $(`#comment-textbox-${orderId}`).toggleClass("greybox");
      this.setState({ commentDisabled: true });
    }
    );
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  render() {
    const { data, orderId, order, changeOrderStatus } = this.props

    $(".status-option").prop("checked", false);
    $(`#${order.status}-${orderId}`).prop("checked", true);
    if (order.status === "Cancelled") {
      console.log(order.status)
      $(`#dark-overlay-${order.id}`).removeClass("hidden");
      $(`add-button-${order.id}`).toggleClass("hidden");
    } else {
      $(`#dark-overlay-${order.id}`).addClass("hidden");
      $(`add-button-${order.id}`).toggleClass("hidden");
    }

    return (
      <div>
        {/* Status Bar */}
        <div className="status-options">
          <h4 className="detail-title status-title">Status:</h4>
          <div className="status-option"
            onClick={this.changeOrderStatus.bind(this, order, "Pending")}>
            <input
              type="radio"
              name="status"
              value="Pending"
              id={`Pending-${order.id}`}
            />
            <label id="pending-label">Pending</label>
          </div>
          <div className="status-option"
            onClick={this.changeOrderStatus.bind(this, order, "In_Progress")}>
            <input
              type="radio"
              name="status"
              value="In_Progress"
              id={`In_Progress-${order.id}`}
            />
            <label id="in-progress-label">In Progress</label>
          </div>
          <div className="status-option"
            onClick={this.changeOrderStatus.bind(this, order, "Ready")}>
            <input
              type="radio"
              name="status"
              value="Ready"
              id={`Ready-${order.id}`}
            />
            <label id="ready-label">Ready</label>
          </div>
          <div className="status-option"
            onClick={this.changeOrderStatus.bind(this, order, "Picked_up")}>
            <input
              type="radio"
              name="status"
              value="Picked_up"
              id={`Picked_up-${order.id}`}
            />
            <label id="picked-up-label">Picked Up</label>
          </div>
          <div className="cancel-order"
            onClick={this.changeOrderStatus.bind(this, order, "Cancelled")}>
            <input
              type="radio"
              name="status"
              value="Cancelled"
              id={`Cancelled-${order.id}`}
            />
            <label id="cancelled-label"></label>
          </div>
        </div>

        {this.loadingBar()}

        <OrderLinesIndexContainer data={data} orderId={order.id} />

        {/* Order details */}
        <div>
          <h4 className="detail-title">Comments:</h4>
          <div className="comments-container">
            <div className="comments-info">
              <textarea
                id={`comment-textbox-${orderId}`}
                className="textbox greybox"
                value={this.state.comments}
                placeholder="No comments"
                onChange={this.update('comments')}
                disabled={this.state.commentDisabled}>
              </textarea>
              <button
                id={`edit-comment-button-${orderId}`}
                className="btn"
                onClick={this.editComment}>
                Edit Comments
              </button>
            </div>
            <button
              id={`update-comment-button-${orderId}`}
              className="btn hidden"
              onClick={this.handleComment}>
              Update Comments
            </button>
            <button
              id={`edit-cancel-button-${orderId}`}
              className="btn hidden"
              onClick={this.toggleEditComments}>
              Cancel
            </button>
          </div>
        </div>
        <div className="customer-info">
          <h4 className="detail-title">Customer:</h4>
          <h6><b>Name: </b>{order.customer.name}</h6>
          <h6><b>Phone: </b>{order.customer.phone_number}</h6>
          <h6><b>Email: </b>{order.customer.email}</h6>
          <h6><b>Address: </b>{order.customer.address}</h6>
          <h6><b>Comment: </b>{order.customer.comment}</h6>
          <button
            id="edit-customer-button"
            className="btn"
            onClick={this.navigateToCustomerEdit.bind(this, order.customer.id)}>
            Edit Customer
          </button>
        </div>
        <br />

      </div>
    )
  }
}

export default withRouter(OrderDetail);
