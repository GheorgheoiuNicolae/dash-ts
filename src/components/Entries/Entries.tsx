import * as React from 'react';

export default class Entries extends React.Component<any, any> {
  componentWillMount(){
    console.log('this', this)
  }
  
  render() {
    return (
      <div className="entries">
        <h3>Entries</h3>
      </div>
    );
  }
}
