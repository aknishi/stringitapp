import { combineReducers } from 'redux';

import session from './session_errors_reducer';
import order from './order_errors_reducer';

export default combineReducers({
  session,
  order
});
