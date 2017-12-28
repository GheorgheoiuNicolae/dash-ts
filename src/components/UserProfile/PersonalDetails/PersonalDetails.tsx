import * as React from 'react';
import { RaisedButton } from 'material-ui';
import { Field } from 'redux-form';
import { TextField, Checkbox } from 'redux-form-material-ui';
import styled from 'styled-components';
import FileUploadIcon from 'material-ui/svg-icons/file/file-upload';
import { StateProps, DispatchProps, OwnProps } from './PersonalDetailsContainer';
import RequestAuth from './requestAuth';

// import ChangePassword from './changePassword';
var FontAwesome = require('react-fontawesome');
import '../style.css';

type Props = StateProps & OwnProps & DispatchProps;
interface OtherProps {
  newPassword: string;
  newPasswordConfirmation: string;
  passwordError: string;
}

export default class PersonalDetails extends React.PureComponent<Props, OtherProps> {
  constructor() {
    super();
    this.state = {
      newPassword: '',
      newPasswordConfirmation: '',
      passwordError: '',
    };
  }

  handleSubmit = (values: any) => {
    const { updateUserDisplayName, updateUserEmail } = this.props;
    delete values.emailVerified;

    const { auth } = this.props;
    if(values.email !== auth.user.email) {
      updateUserEmail(values.email);
    }
    if(values.displayName !== auth.user.displayName) {
      delete values.email;
      updateUserDisplayName(values);
    }
  }

  handleFile = (e: any) => {
    const { uploadAvatar } = this.props;
    uploadAvatar( e.target.files[0] );
  }

  sendConfirmationEmail = () => {
    const { sendConfirmationEmail } = this.props;
    sendConfirmationEmail();
  }

  changePassword = () => {
    // password validation
    const { newPassword, newPasswordConfirmation } = this.state;
    const { changePassword } = this.props;

    if( newPassword === newPasswordConfirmation) {
      // at least one number, one lowercase and one uppercase letter
      // at least six characters that are letters, numbers or the underscore
      // const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

      // at least 6 characters
      const re = /(?=.*[a-z]).{6,}/;
      if( re.test(newPassword)) {
        changePassword(newPassword);
        this.setState({passwordError: ''});
      } else {
        this.setState({
          passwordError: 'The password has to contain at least 6 characters.'
        });
      }
    } else {
      this.setState({
        passwordError: 'Passwords do not match.'
      });
    }
  }

  render () {
    const {
      auth,
      handleSubmit,
      uploadInProgress,
      updateEmailError,
    } = this.props;

    const { passwordError } = this.state;

    const {
      updatePasswordError,
      updatePasswordSuccess
    } = auth;

    return (
      <Wrap>
        <Avatar
          className="avatar-input"
          style={{backgroundImage: `url(${auth.user.photoURL})`, backgroundSize: 'cover'}}
        >
          {auth.user.uid && (
            <div style={{width: '100%', height: '100%', position: 'relative'}}>
              <input
                type="file"
                onChange={(e) => this.handleFile(e)}
                style={{width: '100%', height: '100%', opacity: 0, position: 'absolute', zIndex: 2}}
              />
              <IconWrap className="upload-icon-wrap">
                <StyledFileUploadIcon />
              </IconWrap>
              {uploadInProgress && (<div
                className="loading"
                style={{display: 'flex', justifyContent:'center', alignItems: 'center'}}
              >
                <FontAwesome
                  name="spinner"
                  spin={true}
                  style={{ color: '#fff' }}
                />
              </div>)}
            </div>
          )}
        </Avatar>
        <form
          onSubmit={handleSubmit(this.handleSubmit.bind(this))}
          style={{
            flex: 1,
          }}
        >
          <Heading>Account information</Heading>
          <InputWrap>
            <Field
              component={TextField}
              floatingLabelFixed={true}
              floatingLabelText={'Full Name'}
              fullWidth={true}
              name={`displayName`}
              className="input-wrapper input"
            />
          </InputWrap>

          <InputWrap>
            <Field
              component={TextField}
              floatingLabelFixed={true}
              floatingLabelText={'Email'}
              // disabled={true}
              fullWidth={true}
              name={`email`}
              className="input-wrapper input"
            />
          </InputWrap>

          {updateEmailError && (
            <div className="emailError">
              {updateEmailError.code === 'auth/requires-recent-login' ? (
                <EmailErrorText>Please reauthenticate and try again.</EmailErrorText>
              ) : (
                <EmailErrorText>{updateEmailError.message}</EmailErrorText>
              )}
            </div>
          )}

          <div
            className="emailProperties"
            style={{display: 'flex', flexDirection: 'column'}}
          >
            <InputWrap style={{flex: 1}}>
              <Field
                component={Checkbox}
                label={auth.user.emailVerified ? 'Verified' : 'Please verify your email address'}
                disabled={true}
                name={`emailVerified`}
                className="checkbox-wrapper"
              />
            </InputWrap>
            {!auth.user.emailVerified && (
              <a
                style={{flex: 1, cursor: 'pointer'}}
                onClick={() => this.sendConfirmationEmail()}
              >
                Resend confirmation email
              </a>
            )}
          </div>

          <RaisedButton
            label="Save"
            secondary={true}
            className="successButton"
            onClick={handleSubmit(this.handleSubmit.bind(this))}
            style={{margin: '10px 10px 0 0'}}
          />

          <section
            className="changePassword"
            style={{
              paddingTop: '20px',
              borderTop: '1px solid #ddd',
              marginTop: '30px'
            }}
          >
            <Heading>Change Password</Heading>
            {updatePasswordSuccess && (
              <ChangePasswordSuccess>
                Your password was successfully updated.
              </ChangePasswordSuccess>
            )}
            {updatePasswordError && (
              <ChangePasswordError>
                {updatePasswordError.message}
              </ChangePasswordError>
            )}
            {passwordError && (
              <ChangePasswordError>
              {this.state.passwordError}
            </ChangePasswordError>
            )}
            <InputWrap>
              <Field
                component={TextField}
                style={{width: '100%'}}
                label={'New Password'}
                floatingLabelFixed={true}
                floatingLabelText={'New Password'}
                name={`newPassword`}
                type="password"
                onChange={(e: any) => this.setState({newPassword: e.target.value})}
                className="input-wrapper input"
              />
            </InputWrap>

            <InputWrap>
              <Field
                component={TextField}
                style={{width: '100%'}}
                floatingLabelFixed={true}
                floatingLabelText={'Confirm Password'}
                name={`newPasswordConfirmed`}
                type="password"
                onChange={(e: any) => this.setState({newPasswordConfirmation: e.target.value})}
                className="input-wrapper input"
              />
            </InputWrap>
            <RaisedButton
              label="Change Password"
              secondary={true}
              className="successButton"
              onClick={() => this.changePassword()}
              style={{margin: '10px 10px 0 0'}}
            />
          </section>
        </form>
        <RequestAuth/>
        {/* <ChangePassword /> */}
      </Wrap>
    );
  }
}

const Wrap = styled.section`
  display: flex;
  flex-direction: row;
  padding: 20px;
`;
const InputWrap = styled.div`
  margin-bottom: 10px;
  max-width: 300px;
`;
const EmailErrorText = styled.h5`
  margin-top: 0;
  color: crimson;
`;
const ChangePasswordSuccess = styled.h5`
  margin-top: 0;
  color: #51d399;
`;
const ChangePasswordError = styled.h5`
  margin-top: 0;
  color: crimson;
`;
const Heading = styled.h4`
  margin: 0;
`;
const Avatar = styled.div`
  width: 200px;
  height: 200px;
  margin-right: 20px;
`;
const IconWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 2;
`;
const StyledFileUploadIcon = styled(FileUploadIcon)`
  width: 72px!important;
  height: 72px!important;
  color: #fff!important;
  position: absolute;
  z-index: 1;
`;
