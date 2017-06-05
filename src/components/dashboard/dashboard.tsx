import { connect } from 'react-redux';
import * as React from 'react';
import { PureComponent } from 'react';
import { logout } from './actions';

export interface StyledComponentProps {
  style?: string;
}

class Dashboard<P, S> extends PureComponent<P & StyledComponentProps, S> {
  logout = () => {
    logout();
  }
  render () {
    return (
      <div className='dashboard'>
       <h3 onClick={() => this.logout()}>Logout</h3>
        <div className="dashboard-content">
          {this.props.children}
        </div>
      </div>
    )
  }
}
export default connect((store) => {
  return {
    store: store
  }
})(Dashboard);