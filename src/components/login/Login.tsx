import * as React from 'react';

import {Field} from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import styled from 'styled-components';
import { login } from './actions';

interface Props {
  login: Function,
  handleSubmit: any;
}
interface OwnProps {}


export default class Login extends React.Component<Props, OwnProps> {
  submitForm = (v: any) => {
    login(v.email, v.password)
  }

  render () {
    const { handleSubmit } = this.props;
    return (
      <LoginWrap>
        <Header>
          <h1> Login </h1>
        </Header>
        <Content>
          <form onSubmit={handleSubmit(this.submitForm)}>
            <InputWrap>
              <Field
                component={TextField}
                floatingLabelFixed
                floatingLabelText={'Email'}
                fullWidth
                name="email"
              />
            </InputWrap>
            <InputWrap>
              <Field
                type="password"
                component={TextField}
                floatingLabelFixed
                floatingLabelText={'Password'}
                fullWidth
                name="password"
              />
            </InputWrap>
            <RaisedButton type="submit" label="Login" primary={true} />
          </form>
        </Content>
        <Footer>
          <StyledRouterLink to="/register" activeClassName="active">Register</StyledRouterLink>
          <StyledRouterLink to="/register" activeClassName="active">*Reset password</StyledRouterLink>
        </Footer>
      </LoginWrap>
    )
  }
}

const LoginWrap = styled.div`
  background: #fff;
  width: 300px;
`
const Content = styled.div`
  padding: 0 30px;
`
const Header = styled.div`
  padding: 0 30px;
`
const InputWrap = styled.div`
  margin-bottom: 10px;
`
const Footer = styled.footer`
  margin-top: 20px;
  padding: 20px;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ghostwhite;
`
const StyledRouterLink = styled(Link)`
	color: palevioletred;
  display:flex;
  flex: 1;
`;