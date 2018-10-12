import React from "react";
import UserSearch from "./user_search";
import OrderLineFormContainer from '../order_lines/order_line_form_container';
import OrderLinesIndexContainer from '../order_lines/order_lines_index_container';
import { withRouter } from 'react-router-dom';

class OrderForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      customer_id: "",
      comments: "",
      orderLinesIndex: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setupCustomer = this.setupCustomer.bind(this);
    this.showOrderDetailForm = this.showOrderDetailForm.bind(this);
    this.showOrderLinesIndex = this.showOrderLinesIndex.bind(this);
    this.finishOrder = this.finishOrder.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
    this.navigateToCustomerForm = this.navigateToCustomerForm.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchOrders();
  }

  navigateToCustomerForm(e) {
    e.preventDefault();
    this.props.history.push("/customer-form");
  }

  setupCustomer(callback) {
    const id = $("#customer-id")[0].value;
    this.setState({customer_id: id})
    setTimeout(callback, 100);
  }

  beginOrder(callback) {
    const order = Object.assign({}, this.state);
    delete order.orderLineForm;
    this.props.createOrder(order).then(callback())

  }

  showOrderLinesIndex() {
    const { order, orderLines } = this.props;
    if (this.state.orderLinesIndex) {
      return <OrderLinesIndexContainer data={orderLines} orderId={order.id}/>
    }
  }

  showOrderDetailForm() {
    this.setState({ orderLinesIndex: true })
    console.log(this.state);
    $("#customer-fields").addClass("hidden");
    $("#order-form").addClass("hidden");
    $("#order-detail-form").removeClass('hidden');
    $("#order-comments").removeClass('hidden');
    $("#order-buttons").removeClass('hidden');
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setupCustomer(() => this.beginOrder(() => this.showOrderDetailForm))
  }

  finishOrder() {
    const { order, updateOrder } = this.props
    const updatedOrder = Object.assign({}, this.state);
    delete updatedOrder.orderLinesIndex;
    updatedOrder.status = order.status;
    updatedOrder.order_number = order.order_number;
    updatedOrder.id = order.id;
    if (updatedOrder.comments === "") {
      this.props.history.push("/orders")
    } else {
      updateOrder(updatedOrder).then(this.props.history.push("/orders"))
    }
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  cancelOrder() {
    const { order } = this.props;
    this.props.deleteOrder(order.id).then(this.props.history.push("/orders"))
  }

  render() {
    const { customers, order, orderLines } = this.props;
    return(
      <div className="order-form-container">
        <div className="spacing-container"></div>
        <form id="order-form" className="order-form" onSubmit={this.handleSubmit}>
          <h3>New Order Form</h3>
          <div className="customer-input">
            <UserSearch customers={customers}/>
          </div>
          <h5>or</h5>
          <button id="green-button" className="new-customer-button"
            onClick={this.navigateToCustomerForm}>Create New Customer</button>
          <div id="customer-fields" className="customer-fields hidden">
            <input id="customer-id" type="hidden" disabled value="" onChange={this.setupCustomer}/>
            <input id="customer-name" type="text" disabled placeholder="Full Name" value={this.state.customer_name}/>
            <input id="customer-email" type="text" disabled placeholder="Email" value={this.state.customer_email}/>
            <input id="customer-phone" type="text" disabled placeholder="Phone Number" value={this.state.customer_phone}/>
            <input id="customer-address" type="text" disabled placeholder="Address" value={this.state.customer_address}/>
            <textarea id="customer-comments" className="customer-comments" disabled placeholder="Customer Comments"/>
            <input id="create-order-button" className="create-order-button" type="submit" value="Begin Order"/>
          </div>
        </form>
        <div id="order-detail-form" className="order-detail-form hidden">
          <h3 className="order-form-title">New Order Form</h3>
          <div className="order-info-container">
            <h5><b>Order:</b> {order.order_number}</h5>
            <h5><b>Customer:</b> {order.customer.name}</h5>
            <h5><b>Email:</b> {order.customer.email}</h5>
            <h5><b>Phone Number:</b> {order.customer.phone_number}</h5>
            <h5><b>Address:</b> {order.customer.address}</h5>
          </div>
          {this.showOrderLinesIndex()}
          <br />
          <textarea
            id="order-comments"
            className="order-comments hidden"
            placeholder="Order Comments..."
            onChange={this.update("comments")}
            />
          <div id="order-buttons" className="order-buttons hidden">
            <button className="green-button" onClick={this.finishOrder}>Finish Order</button>
            <button className="cancel-button" onClick={this.cancelOrder}>Cancel</button>
          </div>
        </div>

      </div>
    )
  }
}

export default withRouter(OrderForm);
