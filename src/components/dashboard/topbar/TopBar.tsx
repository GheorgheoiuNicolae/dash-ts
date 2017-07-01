import * as React from 'react';
import styled from 'styled-components';
import { Menu, MenuItem, RaisedButton } from 'material-ui';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import { logoutUser } from '../../../actions/firebase_actions';
console.log('logoutUser: ', logoutUser);

interface Props {}

export default class TopBar extends React.Component<Props, any> {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }
  logoutUser() {
    console.log('logout');
    // this.props.dispatch(action.logout());
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
  
  render () {
    const { open, anchorEl } = this.state;
    return (
      <Topbar>
        <TopbarLink>
          aa
          {/*<AddEntry />*/}
        </TopbarLink>
        
        <Brand>
          <Logo>
            {/*<img src={logo} className="logo" alt="logo" />*/}
          </Logo>
        </Brand>

        <UserAccountDropdown>
          <RaisedButton
            onTouchTap={this.handleTouchTap}
            children={
              <div className="username">
                <div className="avatar">
                  {/*<Avatar src={`${userAvatar}`} size={35} />*/}
                </div>
              </div>
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
              <MenuItem primaryText="Sign out" onClick={() => this.logoutUser} />
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
	flex: 1;
  text-align: center;
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