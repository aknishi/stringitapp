import React from 'react'
import OrderLinesIndexContainer from '../order_lines/order_lines_index_container';
import { withRouter } from 'react-router';

class OrderDetail extends React.Component {
  constructor(props){
    super(props)

    this.navigateToOrderForm = this.navigateToOrderForm.bind(this)
    this.changeStatus = this.changeStatus.bind(this);
    this.handleComment = this.handleComment.bind(this);
  }

  navigateToOrderForm() {
    this.props.history.push("/orderform")
  }

  changeStatus(order, status) {
    const { updateOrder } = this.props;
    const updatedOrder = Object.assign({}, order)
    updatedOrder.status = status;
    updateOrder(updatedOrder);
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

  handleComment(order, e) {
    const { updateOrder } = this.props;
    if (e.keyCode == 13) {
      const updatedOrder = Object.assign({}, order);
      updatedOrder.comments = e.currentTarget.value
      updateOrder(updatedOrder).then(this.hideTextbox(order));
    }
  }

  orderComments(order) {
    if (order.comments === "") {
      return (
        <div>
          <textarea
            id={`textbox-${order.id}`}
            className="textbox hidden"
            placeholder="Comment here"
            onKeyDown={e => this.handleComment(order, e)}>
          </textarea>
          <button
            id={`comment-button-${order.id}`}
            className="add-comment-button green-button"
            onClick={this.showTextbox.bind(this, order)}>
            Add Comment
          </button>
        </div>
      )
    } else {
      return (
        <div>
          <span id={`red-comment-${order.id}`} className="red">{order.comments}</span>
          <textarea
            id={`textbox-${order.id}`}
            className="textbox hidden"
            placeholder={order.comments}
            onKeyDown={e => this.handleComment(order, e)}>
          </textarea>
          <button
            id={`comment-button-${order.id}`}
            onClick={this.showTextbox.bind(this, order)}>
            Edit Comment
          </button>
        </div>
      )
    }
  }

  render() {
    const { data, orderId, order, changeStatus } = this.props

    $(".status-option").prop("checked", false);
    $(`#${order.status}-${order.id}`).prop("checked", true);

    return (
      <div>
        <OrderLinesIndexContainer data={data} orderId={order.id}/>
        <br />
        <h4>Order Comments:</h4>
        {this.orderComments(order)}
        <br />
        <div className="status-options">
          <h4 className="status-title">Order Status:</h4>
          <div className="status-option"
            onClick={this.changeStatus.bind(this, order, "Pending")}>
            <input
              type="radio"
              name="status"
              value="Pending"
              id={`Pending-${order.id}`}
              />
            <label id="pending-label">Pending</label>
          </div>
          <div className="status-option"
            onClick={this.changeStatus.bind(this, order, "In_Progress")}>
            <input
              type="radio"
              name="status"
              value="In_Progress"
              id={`In_Progress-${order.id}`}
              />
            <label id="in-progress-label">In Progress</label>
          </div>
          <div className="status-option"
            onClick={this.changeStatus.bind(this, order, "Ready")}>
            <input
              type="radio"
              name="status"
              value="Ready"
              id={`Ready-${order.id}`}
              />
            <label id="ready-label">Ready</label>
          </div>
          <div className="status-option"
            onClick={this.changeStatus.bind(this, order, "Picked_up")}>
            <input
              type="radio"
              name="status"
              value="Picked_up"
              id={`Picked_up-${order.id}`}
              />
            <label id="picked-up-label">Picked Up</label>
          </div>
          <div className="status-option"
            onClick={this.changeStatus.bind(this, order, "Cancelled")}>
            <input
              type="radio"
              name="status"
              value="Cancelled"
              id={`Cancelled-${order.id}`}
              />
            <label id="cancelled-label">Cancelled</label>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(OrderDetail);
