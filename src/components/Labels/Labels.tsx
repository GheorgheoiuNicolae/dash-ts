import * as React from 'react';

export default class Labels extends React.Component<any, any> {
  componentWillMount() {
    console.log('this', this);
  }
  
  render() {
    return (
      <div className="entries">
        <h3>Labels</h3>
      </div>
    );
  }
}
