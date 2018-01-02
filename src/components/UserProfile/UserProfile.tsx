import * as React from 'react';
import styled from 'styled-components';
import PersonalDetails from './PersonalDetails/';

// import './style.css';

export default class UserProfile extends React.Component<{}, {}> {
  render() {
    return (
      <Wrap className="user-profile">
        <PersonalDetails />
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
