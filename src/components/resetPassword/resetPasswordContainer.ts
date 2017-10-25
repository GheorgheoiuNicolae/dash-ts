import { connect } from 'react-redux';
import { ApplicationState } from '../../redux/reducers';
import ResetPassword from './resetPassword';
import { reduxForm } from 'redux-form';
import { resetPasswordByEmail } from '../../redux/auth/creators';

export interface StateProps {
  requestedPasswordReset: boolean;
}

export interface DispatchProps {
  resetPasswordByEmail: (email: string) => {};
  handleSubmit: Function;
}

export interface OwnProps {}

const mapStateToProps = (state: ApplicationState) => ({
  requestedPasswordReset: state.auth.requestedPasswordReset,
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  {
    resetPasswordByEmail,
  },
)(reduxForm({
  form: 'resetPassword',
})(ResetPassword));
