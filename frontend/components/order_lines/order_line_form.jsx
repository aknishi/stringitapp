import React from 'react';

class OrderLineForm extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    const { orderId, createOrderLine } = this.props;
    return(
      <div>
        <h1>Order Line form here.</h1>
      </div>
    )
  }
}

export default OrderLineForm;
