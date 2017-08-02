import * as React from 'react';
import * as moment from 'moment';
import { StateProps, DispatchProps, OwnProps } from './EntriesContainer';
import EntryListItem from './EntryListItem/EntryListItem';
import { Any } from '../../types';
import styled from 'styled-components';
import Header from '../dashboard/Header/';

export type Props = StateProps & OwnProps & DispatchProps;
interface OtherProps {
  // component state props here
}

export default class Entries extends React.Component<Props, OtherProps> {
  setScrollToDate() {
    const wrap  = document.getElementById('entries-page-wrap');
    setTimeout(() => {
      const todayEntry  = document.getElementById('-Kp51e59EiotL60UI5J1');
      if( wrap && todayEntry ) {
        wrap.scrollTop = todayEntry.offsetTop;
      }
    }, 200);
  }

  componentWillReceiveProps(next: any) {
    if(next.entries) {
      this.setScrollToDate();
    }
  }

  render() {
    const { entries, user, removeEntry, view } = this.props;
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
      <Wrap id="entries-page-wrap">
        <Header />
        <EntryList className={`view-boxes ${view}`}>
          <TimelineBar />
          {entries && mappedDays}
        </EntryList>
      </Wrap>
    );
  }
}

const EntryList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 50px;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
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