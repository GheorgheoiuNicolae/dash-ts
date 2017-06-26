import { connect } from 'react-redux';
import { ApplicationState } from '../../reducers';
import Login from './Login';
import {reduxForm} from 'redux-form';
import { loginUser } from '../../actions/firebase_actions';

export interface StateProps {}

export interface DispatchProps {
  loginUser: (email: string, password: string) => {};
}

export interface OwnProps {}

const mapStateToProps = (state: ApplicationState) => ({
  // login,
});

export default connect<StateProps, DispatchProps, {}>(
  mapStateToProps,
  {
    loginUser,
  },
)(reduxForm({
  form: 'login',
})(Login));
