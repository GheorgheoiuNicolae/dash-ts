import * as React from 'react';
import styled from 'styled-components';
import { Menu, MenuItem, FlatButton } from 'material-ui';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import { StateProps, DispatchProps, OwnProps } from './TopBarContainer';
import { browserHistory } from 'react-router';
import { Any } from '../../../types/';
import Avatar from 'material-ui/Avatar';
const userAvatar = require('../../../assets/user-avatar.png');
const logo = require('../../../assets/logo.png');

export type Props = StateProps & OwnProps & DispatchProps;

interface OtherProps {
  open: boolean;
  anchorEl: Any;
}
export default class TopBar extends React.PureComponent<Props, OtherProps> {
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
      <Topbar>
        <TopbarLink>
          Add Entry
          {/*<AddEntry />*/}
        </TopbarLink>
        
        <Brand>
          <Logo>
            <img src={logo} alt="logo" />
          </Logo>
        </Brand>

        <UserAccountDropdown>
          <StyledFlatButton
            onTouchTap={this.handleTouchTap}
            children={
              <UserDropdown>
                <AvatarWrap>
                  <Avatar src={`${userAvatar}`} size={35} />
                </AvatarWrap>
                <div className="user">
                  {auth.user.displayName ? auth.user.displayName : auth.user.email}
                </div>
              </UserDropdown>
            }
          />
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
      </Topbar>
    );
  }
}

const Topbar = styled.div`
	height: 50px;
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
	box-shadow: 0px 0px 15px 0px #bdbdbd;
  position: absolute;
  z-index: 2;
  padding-left: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Brand = styled.div`
  display: flex;
	flex: 1;
  justify-content: center;
`;
const Logo = styled.div`
	max-width: 160px;
`;
const TopbarLink = styled.div`
  border-right: 1px solid @topbar-link-separator;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 100%;
`;
const UserAccountDropdown = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;
const UserDropdown = styled.div`
  display: flex;
  padding: 0 5px;
`;
const AvatarWrap = styled.div`
  padding: 0 10px;
  display: flex;
  align-items: center;
`;

const StyledFlatButton = styled(FlatButton)`
  height: 100%;
  min-height: 100%;
  padding: 0 10px !important;
  border-radius: 0px!important;
`;