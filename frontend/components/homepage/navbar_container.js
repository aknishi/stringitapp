import { connect } from 'react-redux';
import { login, logout, clearErrors } from '../../actions/session_actions';
import Navbar from './navbar';

const mapStateToProps = (state, { match }) => {
  const errors = state.errors.session;
  const currentUserId = state.session.id
  return ({
    errors,
    currentUserId
  });
};

const mapDispatchToProps = (dispatch) => ({
  login: user => dispatch(login(user)),
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
