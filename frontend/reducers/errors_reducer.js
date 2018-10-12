import { combineReducers } from 'redux';

import session from './session_errors_reducer';
import order from './order_errors_reducer';
import orderLine from './order_line_errors_reducer';
import racket from './racket_errors_reducer';
import cord from './cord_errors_reducer';
import user from './user_errors_reducer';

export default combineReducers({
  session,
  order,
  orderLine,
  racket,
  cord,
  user
});
