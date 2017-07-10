import * as React from 'react';
import { Any } from '../../types';

import {Field} from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import styled from 'styled-components';

interface Props {
  resetPasswordEmail: (email: Any) => {};
  handleSubmit: Any;
  requestedPasswordReset: boolean;
}
interface OwnProps {}

export default class ResetPasword extends React.Component<Props, OwnProps> {
  submitForm = (v: Any) => {
    const { resetPasswordEmail } = this.props;
    resetPasswordEmail(v.email);
  }
  
  render () {
    // console.log('props', this.props);
    const { handleSubmit, requestedPasswordReset } = this.props;
    return (
      <RegisterWrap>
        <Header>
          <h1> Reset password </h1>
        </Header>
        <Content>
          {!requestedPasswordReset 
          ? <form onSubmit={handleSubmit(this.submitForm)}>
            <InputWrap>
              <Field
                component={TextField}
                floatingLabelFixed={true}
                floatingLabelText={'Email'}
                fullWidth={true}
                name="email"
              />
            </InputWrap>
            <RaisedButton type="submit" label="Reset" primary={true} />
          </form>
          : <p>Check your email.</p> }
        </Content>
        <Footer>
          <StyledRouterLink to="/login" activeClassName="active">Login</StyledRouterLink>
        </Footer>
      </RegisterWrap>
    );
  }
}

const RegisterWrap = styled.div`
  background: #fff;
  width: 300px;
`;
const Content = styled.div`
  padding: 0 30px;
`;
const Header = styled.div`
  padding: 0 30px;
`;
const InputWrap = styled.div`
  margin-bottom: 10px;
`;
const Footer = styled.footer`
  margin-top: 20px;
  padding: 20px;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ghostwhite;
`;
const StyledRouterLink = styled(Link)`
	color: palevioletred;
  display:flex;
  flex: 1;
`;
