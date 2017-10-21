import * as React from 'react';

import {Field} from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import styled from 'styled-components';
const logo = require('../../assets/logo/complete-white.svg');

interface Props {
  resetPasswordByEmail: (email: any) => {};
  handleSubmit: any;
  requestedPasswordReset: boolean;
}
interface OwnProps {}

export default class ResetPasword extends React.Component<Props, OwnProps> {
  submitForm = (v: any) => {
    const { resetPasswordByEmail } = this.props;
    resetPasswordByEmail(v.email);
  }
  
  render () {
    const { handleSubmit, requestedPasswordReset } = this.props;
    return (
      <RegisterWrap>
        <Logo>
          <LogoImg src={logo} alt="logo" className="logo" />
        </Logo>
        <Content>
          <Header>
            <h6 className="h6">Reset Password</h6>
          </Header>
          {!requestedPasswordReset 
          ? <form onSubmit={handleSubmit(this.submitForm)}>
            <InputWrap>
              <Field
                component={TextField}
                floatingLabelFixed={true}
                floatingLabelText={'Email'}
                fullWidth={true}
                name="email"
                className="input-wrapper input"
              />
            </InputWrap>
            <RaisedButton 
              fullWidth={true} 
              type="submit" 
              label="Reset" 
              primary={true} 
              style={{marginTop: '20px'}}
            />
          </form>
          : <p>Follow the link we sent via email to reset your password.</p> }
        </Content>
        <Footer>
          <StyledRouterLink to="/login" activeClassName="active">Login</StyledRouterLink>
        </Footer>
      </RegisterWrap>
    );
  }
}

const RegisterWrap = styled.div`
  width: 400px;
`;
const Content = styled.div`
  padding: 5px 30px 30px 30px;
  text-align: center;
  background: #fff;
`;
const Header = styled.div`
  color: #6b7c93;
  text-align: center;
  border-bottom: 1px solid #f7f7f7;
`;
const InputWrap = styled.div`
  margin-bottom: 10px;
`;
const Footer = styled.footer`
  padding: 20px;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #eee;
`;
const StyledRouterLink = styled(Link)`
	color: #333;
  text-decoration: none;
  display:flex;
  flex: 1;
  justify-content: center;
`;
const Logo = styled.div`
	max-width: 160px;
  margin-left: 50px;
  position: absolute;
`;
const LogoImg = styled.img`
  position: relative;
  top: -50px;
  left: 80px;
`;