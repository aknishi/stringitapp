import React from 'react';
// Components
import OrderLinesItemContainer from './order_lines_item_container';
import OrderLineForm from './order_line_form';

const OrderLines = ({ orderLines, orderId, createOrderLine }) => {
  const orderLineItems = orderLines.map(orderLine => (
    <OrderLinesItemContainer
      key={orderLine.id}
      orderLine={orderLine} />
  ));

  return (
    <table>
      <tbody className="order-lines-container">
        { orderLineItems }
      <OrderLineForm orderId={ orderId } createOrderLine={ createOrderLine } />
      </tbody>  
    </table>
  )
};

export default OrderLines;
