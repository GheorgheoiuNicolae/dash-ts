import { connect } from 'react-redux';
import { ApplicationState } from '../../reducers';
import Login from './Login';
import {reduxForm} from 'redux-form';
import { loginUser } from '../../actions/firebase_actions';

export interface OwnOptionalProps {
  handleSubmit: any;
}

export interface OwnProps extends Partial<OwnOptionalProps> {}

export interface StateProps {
  auth: any;
}

export interface DispatchProps {
  loginUser: (user: any) => {};
}

export interface OwnProps {}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    return {
      auth: state.auth
    };
  },
  {
    loginUser,
  },
)(reduxForm({
  form: 'login',
})(Login));
