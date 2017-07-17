import * as React from 'react';
import styled from 'styled-components';
import { Dialog, FlatButton, Divider, RaisedButton } from 'material-ui';
import { StateProps, DispatchProps, OwnProps } from './SidebarContainer';
import { Link } from 'react-router';
import AddEntryForm from '../../Entries/forms/AddEntry/';
import AdminTools from '../../adminTools/';
import UserCard from '../UserCard/';
import { Any } from '../../../types/';
var FontAwesome = require('react-fontawesome');
const logo = require('../../../assets/logo.png');

export type Props = StateProps & OwnProps & DispatchProps;

interface OtherProps {
  // component state props here
  handleOpen: Any;
  open: boolean;
  submitDisabled: boolean;
}

export default class Sidebar extends React.Component<Props, OtherProps> {
  componentWillMount() {
    this.setState({
      open: false,
      submitDisabled: false
    });
  }
  handleOpen = () => {
    // const { setCurrentEntry, entry } = this.props;
    // setCurrentEntry(entry);

    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  }

  handleSubmit = (e: Any) => {
    e.preventDefault();
    
    this.handleClose();    
  }

  render () {
    const actions = [(
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />),(
        <FlatButton
          label="Submit"
          primary={true}
          keyboardFocused={true}
          onTouchTap={this.handleSubmit}
        />
      ),
    ];
    return (
      <SidebarWrap>
        <MenuToggle>
          <StyledFlatButton
            style={{maxWidth: '100%', minWidth: 'initial', width: '100%', height: '50px'}}
            children={
              <Logo>
                <img src={logo} alt="logo" />
              </Logo>
            }
          />
        </MenuToggle>
        <Divider />
        <UserCard/>
        <Divider />
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

        <Divider />

        <AddButtonWrapper>
          <RaisedButton 
            style={{color: '#fff'}}
            primary={true} 
            label="Add Entry"
            labelPosition="after"
            onTouchTap={this.handleOpen}
          >
            <FontAwesome
              color="#fff"
              name="plus"
            />
          </RaisedButton>
        </AddButtonWrapper>

        <Dialog
          title="add entry"
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          
          <AddEntryForm />
        
        </Dialog>

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
  background: #fff;
  overflow: hidden;
  width: 200px;
`;

const MenuToggle = styled.div`
  background-color: #fff;
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
  color: #8ca4af;
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