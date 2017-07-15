import * as React from 'react';
import * as moment from 'moment';
import { StateProps, DispatchProps, OwnProps } from './EntriesContainer';
import EntryListItem from './EntryListItem/EntryListItem';
import { Any } from '../../types';
import styled from 'styled-components';

export type Props = StateProps & OwnProps & DispatchProps;
interface OtherProps {
  // component state props here
}

export default class Entries extends React.Component<Props, OtherProps> {
  render() {
    const { entries, user, removeEntry } = this.props;
    let mappedDays = entries.map((day: Any, index) => {
      let mappedEntries = day.entries.map( (entry: Any) => {
        return (
          <EntryListItem 
            user={user} 
            entry={entry} 
            key={entry.id}
            removeEntry={removeEntry}
          />
        );
      });
      return (
        <div key={index}>
          <Date>{moment(day.date).format('dddd, D')} {moment(day.date).format('MMMM YYYY')}</Date>
          {mappedEntries}
        </div>
      );
    });
    
    return (
      <Wrap>
        <EntryList>
          <TimelineBar />
          {mappedDays}
        </EntryList>
      </Wrap>
    );
  }
}

const EntryList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: scroll;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: scroll;
  padding: 0 30px 0 230px;
`;

const TimelineBar = styled.div`
  position: absolute;
  width: 7px;
  height: 100%;
  background: #fff;
  left: 264px;
`;

const Date = styled.p`
  margin-left: 50px;
`;