import * as React from 'react';

import {Field} from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import styled from 'styled-components';
import { register } from './actions';

interface Props {
  auth: any;
  form?: any;
  handleSubmit: any;
  onSubmit: any;
  dispatch: Function;
}
interface OwnProps {}


export default class Register extends React.Component<Props, OwnProps> {
  submitForm = (v: any) => {
    register(v.email, v.password)
  }
  
  render () {
    console.log('props', this.props);
    const { handleSubmit } = this.props;
    return (
      <RegisterWrap>
        <Header>
          <h1> Register </h1>
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
            <RaisedButton type="submit" label="Register" primary={true} />
          </form>
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