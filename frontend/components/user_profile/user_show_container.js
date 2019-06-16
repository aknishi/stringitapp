import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/user_actions';
import { logout } from '../../actions/session_actions';
import { selectCustomers } from '../../reducers/selectors';
import UserShow from './user_show';
import values from 'lodash/values';

const mapStateToProps = (state, { match }) => {
  const userId = parseInt(match.params.userId);
  const user = state.entities.users[userId];
  const currentUserId = state.session.id;
  const admin = state.session.admin;
  const loading = state.ui.loadingUsers.loading;
  const customers = selectCustomers(state.entities.users);
  return({
    userId,
    user,
    currentUserId,
    admin,
    customers,
    loading
  });
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchUsers: () => dispatch(fetchUsers()),
  logout: () => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserShow);
