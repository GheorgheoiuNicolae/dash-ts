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
        {entry.title}
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
  padding: 0 30px 0 230px;
`;