import * as React from 'react';
import styled from 'styled-components';
import { Menu, MenuItem, IconButton } from 'material-ui';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import { StateProps, DispatchProps, OwnProps } from './UserCardContainer';
import { browserHistory } from 'react-router';
import { Any } from '../../../types/';
import Avatar from 'material-ui/Avatar';
const userAvatar = require('../../../assets/user-avatar.png');
var FontAwesome = require('react-fontawesome');

export type Props = StateProps & OwnProps & DispatchProps;

interface OtherProps {
  open: boolean;
  anchorEl: Any;
}

export default class UserCard extends React.PureComponent<Props, OtherProps> {
  constructor() {
    super();
    this.state = {
      open: false,
      anchorEl: null
    };
  }

  logoutUser = () => {
    const { auth, logoutUser } = this.props;
    logoutUser(auth.user);
  }

  componentWillReceiveProps(nextProps: Any) {
    if(!nextProps.auth.user) {
      browserHistory.push('/login');
    }
  }

  handleTouchTap = (event: Any) => {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  }
  
  render () {
    const { open, anchorEl } = this.state;
    const { auth } = this.props;
    return (
      <UserAccountDropdown>
        <AvatarWrap>
          <Avatar src={`${userAvatar}`} size={100} />
        </AvatarWrap>
        <StyledIconButton 
          iconClassName="muidocs-icon-custom-github" 
          onTouchTap={this.handleTouchTap}
          style={{
            width: 30,
            height: 30,
            padding: 0,
          }}
        >
          <FontAwesome
            name="cog"
            style={{ color: '73909d' }}
          />
        </StyledIconButton>
        <UserName>
          {auth.user.displayName 
            ? <Text> {auth.user.displayName} </Text>
            : <UserEmail>{auth.user.email}</UserEmail>
          }
        </UserName>
        <Popover
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={() => this.handleRequestClose()}
          animation={PopoverAnimationVertical}
        >
          <Menu>
            <MenuItem primaryText="Refresh" />
            <MenuItem primaryText="Help &amp; feedback" />
            <MenuItem primaryText="Settings" />
            <MenuItem primaryText="Sign out" onClick={() => this.logoutUser()} />
          </Menu>
        </Popover>
      </UserAccountDropdown>
    );
  }
}

const UserAccountDropdown = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
const UserName = styled.div`
  display: flex;
  padding: 0 5px;
`;
const Text = styled.p`
  font-size: 14px;
`;
const UserEmail = styled.p`
  font-size: 14px;
  font-weight: bold;
`;
const AvatarWrap = styled.div`
  padding: 0 10px;
  display: flex;
  align-items: center;
`;
const StyledIconButton = styled(IconButton)`
  position: absolute!important;
  top: 90px;
  right: 50px;
  background-color: #fff!important;
  border-radius: 100%;
  box-shadow: 2px 2px 10px #eee;
`;