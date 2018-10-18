import React from "react";
import UserSearch from "./user_search";
import OrderLinesIndexContainer from '../order_lines/order_lines_index_container';
import EditCustomerForm from '../session_form/edit_customer_form';
import { withRouter } from 'react-router-dom';

class OrderForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      customer_id: "",
      comments: "",
      orderLinesIndex: false,
      showCustomerForm: false,
      disabledForm: true,
      customer: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setupCustomer = this.setupCustomer.bind(this);
    this.showOrderDetailForm = this.showOrderDetailForm.bind(this);
    this.showOrderLinesIndex = this.showOrderLinesIndex.bind(this);
    this.finishOrder = this.finishOrder.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
    this.navigateToCustomerForm = this.navigateToCustomerForm.bind(this);
    this.navigateToCustomerEdit = this.navigateToCustomerEdit.bind(this);
    this.hideCustomerForm = this.hideCustomerForm.bind(this);
    this.disableForm = this.disableForm.bind(this);
    this.enableForm = this.enableForm.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchOrders();
  }

  navigateToCustomerForm(e) {
    e.preventDefault();
    this.props.history.push("/customer-form");
  }

  navigateToCustomerEdit(e) {
    e.preventDefault();
    this.props.history.push(`/users/accounts/${this.state.customer_id}/edit`)
  }

  setupCustomer(customer) {
    const id = customer.id
    this.setState({customer_id: id, showCustomerForm: true, customer: customer})
    $("#customer-fields").removeClass("hidden");
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
    this.setState({ orderLinesIndex: true, showCustomerForm: false })
    $("#customer-fields").addClass("hidden");
    $("#order-form").addClass("hidden");
    $("#order-detail-form").removeClass('hidden');
    $("#order-comments").removeClass('hidden');
    $("#order-buttons").removeClass('hidden');
  }

  handleSubmit(e) {
    e.preventDefault()
    this.beginOrder(() => this.showOrderDetailForm())
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

  hideCustomerForm() {
    this.setState({showCustomerForm: false})
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  cancelOrder() {
    const { order } = this.props;
    this.props.deleteOrder(order.id).then(this.props.history.push("/orders"))
  }

  disableForm() {
    this.setState({ disabledForm: true })
    $("#customer-edit-button").removeClass("hidden")
  }

  enableForm() {
    this.setState({ disabledForm: false })
    $("#customer-edit-button").addClass("hidden")
  }

  render() {
    let customerForm;
    if (this.state.showCustomerForm) {
      customerForm = <EditCustomerForm
        customer={this.state.customer}
        disabled={this.state.disabledForm}
        errors={this.props.errors}
        updateUser={this.props.updateUser}
        clearErrors={this.props.clearErrors}
        disableForm={this.disableForm}/>
    }

    const { customers, order, orderLines } = this.props;
    return(
      <div className="order-form-container">
        <div className="spacing-container"></div>
        <div id="order-form" className="order-form">
          <h3>New Order Form</h3>
          <div className="customer-input">
            <UserSearch
              customers={customers}
              setupCustomer={this.setupCustomer}
              hideCustomerForm={this.hideCustomerForm}/>
          </div>
          <h5>or</h5>
          <button id="new-customer-button" className="green-button"
            onClick={this.navigateToCustomerForm}>Create New Customer</button>
          <div className="order-form-customer-form">
            { customerForm }
          </div>
          <div id="customer-fields" className="customer-fields hidden">
            <button id="customer-edit-button" className="grey-button" value="Edit Customer" onClick={this.enableForm}>
              Edit Customer
            </button>
            <button id="create-order-button" className="green-button" onClick={this.handleSubmit}>
              Begin Order
            </button>
          </div>
        </div>
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
            <button className="grey-button" onClick={this.cancelOrder}>Cancel</button>
          </div>
        </div>

      </div>
    )
  }
}

export default withRouter(OrderForm);
