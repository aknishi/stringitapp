import { connect } from 'react-redux';
import { updateUser, clearErrors } from '../../actions/user_actions';
import React from 'react';
import EditCustomerForm from './edit_customer_form';

const mapStateToProps = (state, { match }) => {
  const customer = state.entities.users[match.params.userId];
  const errors= state.errors.user
  return({
    customer,
    errors
  })
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateUser: user => dispatch(updateUser(user)),
  clearErrors: () => dispatch(clearErrors()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCustomerForm);
