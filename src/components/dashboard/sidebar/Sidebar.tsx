import * as React from 'react';
import styled from 'styled-components';
import { FlatButton } from 'material-ui';
import { StateProps, DispatchProps, OwnProps } from './SidebarContainer';
import { Link } from 'react-router';
import AdminTools from '../../adminTools/';
var FontAwesome = require('react-fontawesome');
const logo = require('../../../assets/logo.png');
import './sidebar.css';

export type Props = StateProps & OwnProps & DispatchProps;

interface OtherProps {
  collapsed: boolean;
}

export default class Sidebar extends React.Component<Props, OtherProps> {
  constructor() {
    super();
    this.state = {
      collapsed: false
    };
  }
  toggleMenu = () => {
    const currentState = this.state.collapsed;
    console.log('toggleMenu: ', currentState);
    this.setState({
        collapsed: !currentState
    });
  }

  render () {
    const { collapsed } = this.state;
    return (
      <SidebarWrap className={`Sidebar ${collapsed ? 'collapsed' : 'expanded'}`} >
        {/*<Logo>
          <img src={logo} alt="logo" />
        </Logo>*/}
        <MenuToggle>
          <StyledFlatButton
            style={{maxWidth: '100%', minWidth: 'initial', width: '100%', height: '50px'}}
            onClick={() => this.toggleMenu()}
            children={
              <Logo>
                <img src={logo} alt="logo" />
              </Logo>
            }
          />
        </MenuToggle>
        <StyledFlatButton
          style={{maxWidth: '100%', minWidth: 'initial', width: '100%', height: '50px'}}
          children={
            <StyledRouterLink to="/today">
              <FontAwesome
                name="th-large"
              />
              <ButtonText className="button-text">Today</ButtonText>
            </StyledRouterLink>
          }
        />
        <StyledFlatButton
          style={{maxWidth: '100%', minWidth: 'initial', width: '100%', height: '50px'}}
          children={
            <StyledRouterLink to="/entries">
              <FontAwesome
                name="list-ul"
              />
              <ButtonText className="button-text">Entry List</ButtonText>
            </StyledRouterLink>
          }
        />
        
        <StyledFlatButton
          style={{maxWidth: '100%', minWidth: 'initial', width: '100%', height: '50px'}}
          children={
            <StyledRouterLink to="/labels">
              <FontAwesome
                name="tag"
              />
              <ButtonText className="button-text">Labels</ButtonText>
            </StyledRouterLink>
          }
        />

        <AdminTools />
      </SidebarWrap>
    );
  }
}

const SidebarWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 3;
  background: #222526;
  overflow: hidden;
`;

const MenuToggle = styled.div`
  background-color: #fff;
  border-right: 1px solid #EEF3F9;
`;
const StyledFlatButton = styled(FlatButton)`
  display:flex;
  flex: 1;
  text-decoration: none;
`;
const StyledRouterLink = styled(Link)`
  display:flex;
  flex: 1;
  color: #fff;
  text-decoration: none;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.span`
	display: flex;
  flex: 1;
  margin-left: 10px;
`;
const Logo = styled.div`
	max-width: 160px;
`;