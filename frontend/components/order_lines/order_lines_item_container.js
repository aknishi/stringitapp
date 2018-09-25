import { connect } from 'react-redux';
import OrderLinesItem from './order_lines_item';
import { updateOrderLine, destroyOrderLine } from '../../actions/order_line_actions';

const mapDispatchToProps = (dispatch, { orderLine }) => ({
  destroyOrderLine: () => dispatch(destroyOrderLine(orderLine)),
  updateOrderLine: updatedStep => dispatch(updateStep(updatedStep))
});

export default connect(
  null, 
  mapDispatchToProps
)(OrderLinesItem);
