import * as React from 'react';
import styled from 'styled-components';

interface Props {}

interface OtherProps {
  // component state props here
}

export default class Entries extends React.PureComponent<Props, OtherProps> {
  render() {
    return (
      <Wrap>
        <b>List item</b>
      </Wrap>
    );
  }
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: scroll;
  padding: 0 30px 0 230px;
`;
