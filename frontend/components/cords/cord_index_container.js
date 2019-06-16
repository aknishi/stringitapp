import { connect } from 'react-redux';
import React from 'react';
import CordIndex from './cord_index';
import { fetchCords } from '../../actions/cord_actions';
import values from 'lodash/values';

const mapStateToProps = ({ entities, ui, session }) => {
  const getCords = values(entities.cords);
  const cords = getCords.slice(0).reverse()
  const loading = ui.loading.loading;
  const currentUserId = session.id;
  const admin = session.admin;

  return({
    cords,
    loading,
    currentUserId,
    admin
  })
};

const mapDispatchToProps = (dispatch) => ({
  fetchCords: () => dispatch(fetchCords()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CordIndex);
