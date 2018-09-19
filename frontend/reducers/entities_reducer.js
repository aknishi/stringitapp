import { combineReducers } from 'redux';

import users from './users_reducer';
import orders from './orders_reducer';
import orderLines from './order_lines_reducer';
import rackets from './rackets_reducer';
import cords from './cords_reducer';

export default combineReducers({
  users,
  orders,
  orderLines,
  rackets,
  cords
});
