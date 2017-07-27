import * as React from 'react';
import styled from 'styled-components';
import { StateProps, DispatchProps, OwnProps } from './HeaderContainer';
import './header.css';
var FontAwesome = require('react-fontawesome');

export type Props = StateProps & OwnProps & DispatchProps;

interface OtherProps {
  // component state props here
}

export default class Header extends React.Component<Props, OtherProps> {
  render () {
    return (
      <HeaderWrap>
        <HeaderItem className="header-item">
          <ItemText>View</ItemText>
          <FontAwesome
            name="th-list"
          />
          <FontAwesome
            name="th-large"
          />
        </HeaderItem>
        <HeaderItem className="header-item">
          <FontAwesome
            name="filter"
          />
          <ItemText>Filter</ItemText>
        </HeaderItem>
        <HeaderItem className="header-item">
          <FontAwesome
            name="search"
          />
          <ItemText>Search</ItemText>
        </HeaderItem>
      </HeaderWrap>
    );
  }
}

const HeaderWrap = styled.div`
  position: absolute;
  top: 0;
  left: 200px;
  right: 0;
  height: 49px;
  z-index: 3;
  overflow: hidden;
  display: flex;
  align-items: center;
  background: #ffffff;
  border-bottom: 1px solid #e0e0e0;
`;
const HeaderItem = styled.div`
  display: flex;
  align-items: center;
  margin: 0 10px;
`;
const ItemText = styled.div`
  margin: 0 10px;
`;
