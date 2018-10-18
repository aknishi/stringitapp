import { connect } from 'react-redux';
import { updateUser, clearErrors, fetchUser } from '../../actions/user_actions';
import React from 'react';
import EditCustomerForm from './edit_customer_form';

const mapStateToProps = (state, { match }) => {
  const customer = state.entities.users[match.params.userId]
  const errors= state.errors.user;
  const disabledForm = false;
  const formType = "Customer Edit";
  const loading = state.ui.loading.loading;
  return({
    customer,
    errors,
    disabled: disabledForm,
    formType,
    loading
  })
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateUser: user => dispatch(updateUser(user)),
  clearErrors: () => dispatch(clearErrors()),
  fetchUser: id => dispatch(fetchUser(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCustomerForm);
