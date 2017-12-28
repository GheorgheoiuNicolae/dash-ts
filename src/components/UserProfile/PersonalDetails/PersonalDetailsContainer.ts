import { connect } from 'react-redux';
import { ApplicationState } from '../../../redux/reducers';
import PersonalDetails from './PersonalDetails';
import { reduxForm } from 'redux-form';
import {
  uploadAvatar,
  updateUserEmail,
  updateUserDisplayName,
  sendConfirmationEmail,
  changePassword
} from '../../../redux/auth/creators';

export interface OwnOptionalProps {
  handleSubmit?: any;
  initialValues: any;
}

export interface OwnProps extends Partial<OwnOptionalProps> {}

export interface StateProps {
  auth: any;
  uploadInProgress: boolean;
  updateEmailError: any;
}

export interface DispatchProps {
  uploadAvatar: Function;
  updateUserEmail: Function;
  updateUserDisplayName: Function;
  sendConfirmationEmail: Function;
  changePassword: any;
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState, ownProps: any) => {
    return {
      auth: state.auth,
      uploadInProgress: state.auth.avatarUploadInProgress,
      updateEmailError: state.auth.updateEmailError,
      initialValues: {
        displayName: state.auth.user && state.auth.user && state.auth.user.displayName,
        email: state.auth.user && state.auth.user && state.auth.user.email,
        emailVerified: state.auth.user && state.auth.user && state.auth.user.emailVerified,
      }
    };
  },
  {
    uploadAvatar,
    updateUserEmail,
    updateUserDisplayName,
    sendConfirmationEmail,
    changePassword,
  },
)(reduxForm({
  form: 'personalDetails',
})(PersonalDetails));
