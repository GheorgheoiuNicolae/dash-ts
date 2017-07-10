import { connect } from 'react-redux';
import { ApplicationState } from '../../reducers';
import Login from './Login';
import {reduxForm} from 'redux-form';
import { Any }  from '../../types';
import { loginUser } from '../../actions/firebase_actions';

export interface OwnOptionalProps {
  handleSubmit: Any;
}

export interface OwnProps extends Partial<OwnOptionalProps> {}

export interface StateProps {
  auth: Any;
}

export interface DispatchProps {
  loginUser: (user: Any) => {};
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
