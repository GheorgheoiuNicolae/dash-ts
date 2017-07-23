import * as React from 'react';
import styled from 'styled-components';
import { StateProps, DispatchProps, OwnProps } from './HeaderContainer';

// var FontAwesome = require('react-fontawesome');

export type Props = StateProps & OwnProps & DispatchProps;

interface OtherProps {
  // component state props here
}

export default class Header extends React.Component<Props, OtherProps> {
  render () {
    return (
      <HeaderWrap>
        header
      </HeaderWrap>
    );
  }
}

const HeaderWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 3;
  background: #fff;
  overflow: hidden;
  width: 200px;
`;
