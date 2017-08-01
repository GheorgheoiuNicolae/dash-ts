import * as React from 'react';

import {Field} from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import styled from 'styled-components';
import { StateProps, DispatchProps, OwnProps } from './LoginContainer';
import { browserHistory } from 'react-router';
const logo = require('../../assets/logo/complete-white.svg');

export type Props = StateProps & OwnProps & DispatchProps;

export default class Login extends React.Component<Props, {} > {
  submitForm = (v: any) => {
    const { loginUser } = this.props;
    const user = {
      email: v.email, 
      password: v.password
    };
    loginUser(user);
  }
  
  componentWillReceiveProps(nextProps: any) {
    if (nextProps.auth.user) {
      browserHistory.push('/authentication');
    }
  }

  render () {
    const { handleSubmit } = this.props;
    return (
      <LoginWrap>
        <Logo>
          <img src={logo} alt="logo" className="logo" />
        </Logo>
        <Content>
          <Header>
            <h6 className="h6">Log into your account</h6>
          </Header>
          <form onSubmit={handleSubmit(this.submitForm)}>
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
            <InputWrap>
              <Field
                type="password"
                component={TextField}
                floatingLabelFixed={true}
                floatingLabelText={'Password'}
                fullWidth={true}
                name="password"
                className="input-wrapper input"
              />
            </InputWrap>
            <RaisedButton 
              fullWidth={true} 
              type="submit" 
              label="Sign in" 
              primary={true} 
              style={{marginTop: '20px'}}
            />
          </form>
        </Content>
        <Footer>
          <StyledRouterLink to="/register" activeClassName="active">Register</StyledRouterLink>
          <StyledRouterLink to="/resetPassword" activeClassName="active">*Reset password</StyledRouterLink>
        </Footer>
      </LoginWrap>
    );
  }
}

const LoginWrap = styled.div`
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