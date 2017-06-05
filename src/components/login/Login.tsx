import * as React from 'react';

import {Field} from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import styled from 'styled-components';
import { login } from './actions';

interface Props {
  auth: any;
  login: Function,
  form?: any;
  handleSubmit: any;
  onSubmit: any;
  dispatch: Function;
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
        <h1> Login </h1>
        <form onSubmit={handleSubmit(this.submitForm)} className="login-form">
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
          <Footer>
            {/*<Link to="/register" activeClassName="active">Register</Link>
            <Link to="/register" activeClassName="active">Reset password</Link>*/}
            <StyledRouterLink to="/register" activeClassName="active">Register</StyledRouterLink>
            <StyledRouterLink to="/register" activeClassName="active">*Reset password</StyledRouterLink>
          </Footer>
        </form>
      </LoginWrap>
    )
  }
}

const LoginWrap = styled.div`
  background: #fff;
  padding: 30px;
  width: 300px;
`
const InputWrap = styled.div`
  margin-bottom: 10px;
`
const Footer = styled.footer`
  margin-top: 15px;
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