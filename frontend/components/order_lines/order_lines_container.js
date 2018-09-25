import { connect } from 'react-redux';
import OrderLines from './order_lines';
import { orderLinesByOrder } from '../../reducers/selectors';
import { createOrderLine } from '../../actions/order_line_actions';

const mapStateToProps = (state, { orderId }) => ({
  orderLines: orderLinesByOrder(state, orderId),
  orderId
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createOrderLine: (...args) => dispatch(createOrderLine(...args))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderLines);
