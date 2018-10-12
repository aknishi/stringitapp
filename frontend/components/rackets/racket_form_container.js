import { connect } from 'react-redux';
import { createRacket, clearErrors, fetchRackets } from '../../actions/racket_actions';
import React from 'react';
import values from 'lodash/values';
import RacketForm from './racket_form';

const mapStateToProps = (state) => {
  const errors = state.errors.racket;
  const rackets = values(state.entities.rackets);
  return({
    errors,
    rackets,
  })
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  createRacket: racket => dispatch(createRacket(racket)),
  clearErrors: () => dispatch(clearErrors()),
  fetchRackets: () => dispatch(fetchRackets())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RacketForm);
