import * as React from 'react';
import * as moment from 'moment';
import { Any } from '../../../types';
import EntrySingle from './EntrySingle/';
import styled from 'styled-components';
import Icon from '../../../App/Icon';
import ConfirmRemoveEntryDialog from './confirmRemove';

interface Props {
  entry: Any;
  user: Any;
  removeEntry: Function;
}
interface StateProps {}

export default class EntryListItem extends React.Component<Props, StateProps> {
  removeEntry() {
    const { user, entry, removeEntry } = this.props;
    removeEntry(entry, user.uid);
  }

  render() {
    const { entry, user } = this.props;
    return (
      <Wrapper>
        <Time> {moment(new Date(entry.date)).format('hh:mm')} </Time>
        <MainLabel>
          <Icon kind="calendar" />
        </MainLabel>
        <EntrySingle entry={entry} />
        <ConfirmRemoveEntryDialog 
          user={user}
          removeEntry={() => this.removeEntry()} 
          entry={entry}
        />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  background: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px 0;
  height: 50px;
  position: relative;
`;

const Time = styled.p`
  position: absolute;
  right: 0;
  top: -35px;
  font-size: 11px;
`;

const MainLabel = styled.div`
  background: coral;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 100%;
  margin: 0 20px;
`;
