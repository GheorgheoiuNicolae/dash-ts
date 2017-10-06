import * as React from 'react';
import { StateProps, DispatchProps, Props } from './EntryContainer';
import styled from 'styled-components';
import EditEntryForm from '../forms/EditEntry/';
export type Props = StateProps & Props & DispatchProps;
interface OtherProps {
  // component state props here
}

export default class Entry extends React.Component<Props, OtherProps> {
  render() {
    const { entry } = this.props;
    return entry ? (
      <Wrap>
        <EditEntryForm entry={entry} />
      </Wrap>
    ) : null;
  }
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: scroll;
  display: flex;
  height: 100%;
  background: #fff;
  margin-left: 220px;
  margin-right: 20px;
  padding: 20px;
  box-sizing: border-box;
`;