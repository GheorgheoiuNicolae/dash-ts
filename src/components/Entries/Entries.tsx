import * as React from 'react';

export default class Entries extends React.Component<{}, {}> {
  componentWillMount() {
    console.log('entries');
  }
  render() {
    return (
      <div className="entries">
        <h3>Entries</h3>
      </div>
    );
  }
}
