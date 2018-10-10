import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import { fetchOrderLines, fetchOrderLine } from './actions/order_line_actions';
import { fetchOrders, deleteOrder } from './actions/order_actions';


document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: {[window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
    } else {
      store = configureStore();
    }
  window.fetchOrders = fetchOrders;
  window.deleteOrder = deleteOrder;
  window.fetchOrderLines = fetchOrderLines;
  window.dispatch = store.dispatch;
  window.getState = store.getState;
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root)
});
