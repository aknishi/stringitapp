import { connect } from 'react-redux';
import React from 'react';
import CordIndex from './cord_index';
import { fetchCords } from '../../actions/cord_actions';
import values from 'lodash/values';

const mapStateToProps = (state) => {
  const getCords = values(state.entities.cords);
  //reverse order:
  const cords = getCords.slice(0).reverse()
  const loading = state.ui.loading.loading;
  return({
    cords,
    loading
  })
};

const mapDispatchToProps = (dispatch) => ({
  fetchCords: () => dispatch(fetchCords()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CordIndex);
