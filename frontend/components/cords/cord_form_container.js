import { connect } from 'react-redux';
import { createCord, clearErrors, fetchCords } from '../../actions/cord_actions';
import React from 'react';
import values from 'lodash/values';
import CordForm from './cord_form';

const mapStateToProps = (state) => {
  const errors = state.errors.cord;
  const cords = values(state.entities.cords);
  return({
    errors,
    cords,
  })
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  createCord: cord => dispatch(createCord(cord)),
  clearErrors: () => dispatch(clearErrors()),
  fetchCords: () => dispatch(fetchCords())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CordForm);
