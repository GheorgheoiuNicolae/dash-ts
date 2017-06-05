import { connect } from 'react-redux';
import * as React from 'react';
import { PureComponent } from 'react';

export interface StyledComponentProps {
  style?: string;
  store: any;
}

class Dashboard<P, S> extends PureComponent<P & StyledComponentProps, S> {
  render () {
    return (
      <div className='dashboard'>
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