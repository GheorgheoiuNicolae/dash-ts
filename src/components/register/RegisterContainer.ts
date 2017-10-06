import { connect } from 'react-redux';
import { ApplicationState } from '../../reducers';
import Register from './Register';
import {reduxForm} from 'redux-form';
import { registerUser } from '../../actions/firebase_actions';

export interface OwnOptionalProps {
  handleSubmit: any;
}

export interface OwnProps extends Partial<OwnOptionalProps> {}

export interface StateProps {
  auth: any;
}

export interface DispatchProps {
  registerUser: (user: any) => {};
}

export interface OwnProps {}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    return {
      auth: state.auth
    };
  },
  {
    registerUser,
  },
)(reduxForm({
  form: 'register',
})(Register));
