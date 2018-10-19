import { combineReducers } from 'redux';
import loading from './loading_reducer';
import { loadingOrders, loadingSingleOrder } from './order_loading_reducer';
import loadingUsers from './users_loading_reducer';

export default combineReducers({
  loading,
  loadingOrders,
  loadingSingleOrder,
  loadingUsers
})
