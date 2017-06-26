import * as React from 'react';
import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';

interface Props {}
interface OwnProps {}

export default class TopBar extends React.Component<Props, OwnProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      open: false,
    };
  }

  logoutUser() {
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
    return (
      <Topbar>
        <div className="topbar-link sort-entries-wrap">
          <RaisedButton
            className="sort-entries-button"
            children={
              <div className="sort-entries">
                {/*<svg className="icon icon-filter_list"><use xlinkHref={`${sprites}#icon-filter_list`}></use></svg>*/}
                <span>Sort entries</span>
              </div>
            }
          />
        </div>
        <div className="topbar-link add-entry-wrap">
          {/*<AddEntry />*/}
        </div>
        
        <div className="brand">
          {/*<img src={logo} className="logo" alt="logo" />*/}
        </div>

        <div className="user-account-dropdown">
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
          {/*<Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
            animation={PopoverAnimationVertical}
          >
            <Menu>
              <MenuItem primaryText="Refresh" />
              <MenuItem primaryText="Help &amp; feedback" />
              <MenuItem primaryText="Settings" />
              <MenuItem primaryText="Sign out" onClick={this.logoutUser.bind(this)} />
            </Menu>
          </Popover>*/}
        </div>
      </Topbar>
    );
  }
}

const Topbar = styled.div`
	height: 50px;
  width: 100%,
`;