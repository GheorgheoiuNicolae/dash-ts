import { connect } from 'react-redux';
import { ApplicationState } from '../../reducers';
import ResetPassword from './resetPassword';
import { reduxForm } from 'redux-form';
import { resetPasswordEmail } from '../../actions/firebase_actions';

export interface StateProps {
  requestedPasswordReset: boolean;
}

export interface DispatchProps {
  resetPasswordEmail: (email: string) => {};
  handleSubmit: Function;
}

export interface OwnProps {}

const mapStateToProps = (state: ApplicationState) => ({
  requestedPasswordReset: state.auth.requestedPasswordReset,
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  {
    resetPasswordEmail,
  },
)(reduxForm({
  form: 'resetPassword',
})(ResetPassword));
