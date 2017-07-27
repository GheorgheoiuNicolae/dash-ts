import * as React from 'react';
import styled from 'styled-components';
import { FlatButton, Divider, RaisedButton } from 'material-ui';
import { StateProps, DispatchProps, OwnProps } from './SidebarContainer';
import { Link } from 'react-router';
import AddEntryForm from '../../forms/AddEntry/';
import AdminTools from '../../adminTools/';
import UserCard from '../UserCard/';

var FontAwesome = require('react-fontawesome');
const logo = require('../../../assets/logo/full-dark.svg');
import './sidebar.css';
export type Props = StateProps & OwnProps & DispatchProps;

interface OtherProps {
  // component state props here
}

export default class Sidebar extends React.Component<Props, OtherProps> {

  render () {
    const { showModal } = this.props;
    return (
      <SidebarWrap className="sidebar">
        <MenuToggle>
          <Logo>
            <img src={logo} alt="logo" className="logo" />
          </Logo>
        </MenuToggle>
        <UserCard/>
        <Divider style={{background: '#232527'}} />
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

        <Divider style={{background: '#232527'}} />

        <AddEntryForm />

        <AddButtonWrapper>
          <RaisedButton 
            style={{color: '#fff'}}
            primary={true} 
            label="Add Entry"
            labelPosition="after"
            onTouchTap={() => showModal('addEntry')}
            icon={<FontAwesome
              name="plus"
              style={{color: '#fff'}}
            />}
          />
          
        </AddButtonWrapper>

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
  overflow: hidden;
  width: 200px;
`;

const MenuToggle = styled.div`
  background: rgba(255,255,255, .02);
  position: absolute;
  right: 0;
  left: 0;
  height: 50px;
`;
const StyledFlatButton = styled(FlatButton)`
  display:flex;
  flex: 1;
  text-decoration: none;
`;
const StyledRouterLink = styled(Link)`
  display:flex;
  flex: 1;
  color: #c1c4ce;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
`;

const ButtonText = styled.span`
	display: flex;
  flex: 1;
  margin-left: 10px;
`;
const Logo = styled.div`
	max-width: 160px;
  margin-left: 30px;
  margin-top: 10px;
`;
const AddButtonWrapper = styled.div`
	display: flex;
  justify-content: center;
  padding-top: 20px;
  flex-direction: row;
`;