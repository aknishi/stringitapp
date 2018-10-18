import { connect } from 'react-redux';
import React from 'react';
import RacketIndex from './racket_index';
import { fetchRackets } from '../../actions/racket_actions';
import values from 'lodash/values';

const mapStateToProps = (state) => {
  const getRackets = values(state.entities.rackets);
  //reverse order:
  const rackets = getRackets.slice(0).reverse()
  const loading = state.ui.loading.loading;
  const currentUserId = state.session.id;
  return({
    rackets,
    loading,
    currentUserId
  })
};

const mapDispatchToProps = (dispatch) => ({
  fetchRackets: () => dispatch(fetchRackets()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RacketIndex);
