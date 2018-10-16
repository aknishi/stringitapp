import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/user_actions';
import { logout } from '../../actions/session_actions';
import UserShow from './user_show';

const mapStateToProps = (state, { match }) => {
  const userId = parseInt(match.params.userId);
  const user = state.entities.users[userId];
  const currentUserId = state.session.id;
  const loading = state.ui.loadingUsers.loading;
  return({
    userId,
    user,
    currentUserId,
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
