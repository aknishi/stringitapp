import { combineReducers } from 'redux';
import loading from './loading_reducer';
import loadingOrder from './order_loading_reducer';

export default combineReducers({
  loading,
  loadingOrder
})
