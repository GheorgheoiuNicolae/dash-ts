import * as React from 'react';
import styled from 'styled-components';

export default class UserProfile extends React.Component<{}, {}> {
  render() {
    return (
      <Wrap className="user-profile">
        <h3>UserProfile</h3>
      </Wrap>
    );
  }
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  overflow: scroll;
  padding: 0 0 0 200px;
`;

