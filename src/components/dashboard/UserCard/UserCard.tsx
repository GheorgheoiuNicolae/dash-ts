import * as React from 'react';
import styled from 'styled-components';
import { Menu, MenuItem, IconButton } from 'material-ui';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import { StateProps, DispatchProps, OwnProps } from './UserCardContainer';
import { browserHistory } from 'react-router';
// import Avatar from 'material-ui/Avatar';
// const userAvatar = require('../../../assets/user-avatar.png');
var FontAwesome = require('react-fontawesome');
import './UserCard.css';

export type Props = StateProps & OwnProps & DispatchProps;

interface OtherProps {
  open: boolean;
  anchorEl: any;
  heightLarger: boolean;
}

export default class UserCard extends React.PureComponent<Props, OtherProps> {
  constructor() {
    super();
    this.state = {
      open: false,
      anchorEl: null,
      heightLarger: true,
    };
  }

  logoutUser = () => {
    const { auth, logoutUser } = this.props;
    logoutUser(auth.user);
  }

  componentWillReceiveProps(nextProps: any) {
    if(!nextProps.auth.user) {
      browserHistory.push('/login');
    }
  }

  handleTouchTap = (event: any) => {
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

  goToProfile = () => {
    browserHistory.push('/my-profile');
  }

  onLoad = (item: any) => {
    const { validateAvatar } = this.props;
    this.setState({
      heightLarger: item.target.clientHeight > item.target.clientWidth
    });
    validateAvatar();
  }

  renderAvatarImage() {
    const { auth } = this.props;
    const { heightLarger } = this.state;
    var maxWidth = {
      maxWidth: '100%'
    };
    var maxHeight = {
      maxHeight: '100%',
    };
    return (
    <AvatarImage
      className="avatar"
      src={auth.user.photoURL}
      onLoad={(e) => this.onLoad(e)}
      style={heightLarger? maxWidth : maxHeight}
    />);
  }

  render () {
    const { open, anchorEl, heightLarger} = this.state;
    const { auth } = this.props;

    return (
      <UserAccountDropdown>
        <AvatarWrap className="avatarWrap" style={{flexDirection: heightLarger ? 'column' : 'row'}}>
          {this.renderAvatarImage()}
        </AvatarWrap>
        <StyledIconButton
          iconClassName="muidocs-icon-custom-github"
          onTouchTap={this.handleTouchTap}
          style={{
            width: 30,
            height: 30,
            padding: 0,
            background: '#000',
          }}
        >
          <FontAwesome
            name="cog"
            style={{ color: '#fff', fontSize: '12px' }}
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
            <MenuItem primaryText="Settings" onClick={() => this.goToProfile()} />
            <MenuItem primaryText="Sign out" onClick={() => this.logoutUser()} />
          </Menu>
        </Popover>
      </UserAccountDropdown>
    );
  }
}

const UserAccountDropdown = styled.div`
  padding: 20px;
  margin-top: 50px;
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
  color: #84838b;
`;
const UserEmail = styled.p`
  font-size: 12px;
  font-weight: bold;
  color: #84838b;
  text-shadow: 0px 0px 1px #000;
`;
const AvatarWrap = styled.div`
  display: flex;
  justify-content: center;
  border: 2px solid #3b4360;
  border-radius: 100%;
  overflow: hidden;
  width: 100px;
  height: 100px;
`;
const AvatarImage = styled.img`
  width: auto;
  height: auto;
`;
const StyledIconButton = styled(IconButton)`
  position: absolute!important;
  top: 90px;
  right: 50px;
  background-color: #494b58!important;
  border-radius: 100%;
  box-shadow: 2px 2px 10px #333;
`;

// #7c92ca