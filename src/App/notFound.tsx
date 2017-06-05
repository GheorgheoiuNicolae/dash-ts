import * as React from 'react';
import { RouterState } from 'react-router';

export default class NotFound extends React.Component<RouterState, void> {
  render() {
    return (
      <h1>404  Not found :( ({this.props.location.pathname})</h1>
    );
  }
}
