import * as React from 'react';
import { StateProps, DispatchProps, OwnProps } from './TodayContainer';
import styled from 'styled-components';
import EntryListItem from './EntryListItem/EntryListItem';
import TimeWidget from './TimeWidget/';

export type Props = StateProps & OwnProps & DispatchProps;

export default class Today extends React.Component<Props, {}> {
  renderTodayEntries = () => {
    const { entries, user, labelsById, removeEntry } = this.props;
    return entries.length ? (
      entries.map((entry: any, index: any) => {
        return (
          <div key={index}>
            <EntryListItem 
              user={user} 
              entry={entry} 
              key={entry.id}
              removeEntry={removeEntry}
              labels={labelsById}
            />
          </div>
        );
      })
    ) : (<TodayMessage>Nothing is happening today? Don't forget to add your entries.</TodayMessage>);
  }
  renderUpcomingEntries = () => {
    const { upcomingEntries, user, labelsById, removeEntry } = this.props;
    return upcomingEntries.length && (
      upcomingEntries.map((entry: any, index: any) => {
        return (
          <div key={index}>
            <EntryListItem 
              user={user} 
              entry={entry} 
              key={entry.id}
              removeEntry={removeEntry}
              labels={labelsById}
              opacity={`0.${7-index}`}
            />
          </div>
        );
      })
    );
  }
  render() {
    const { entries, user } = this.props;
    return (
      <Wrap id="today">
        <PageContent>
          <TodayEntries>
            {entries && <Heading>Today</Heading>}
            {entries && this.renderTodayEntries()}
            {entries && <Heading>Upcoming</Heading>}
            {entries && this.renderUpcomingEntries()}
          </TodayEntries>
          <TimeWidget user={user} />
        </PageContent>
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
  padding: 0 30px 0 230px;
`;
const TodayEntries = styled.div`
  display: flex;
  flex-direction: column;
  flex: 5;
  padding-right: 20px;
`;
const PageContent = styled.div`
  display: flex;
`;
const Heading = styled.h4`
  display: flex;
  color: #fff;
  z-index: 1;
  margin-bottom: 10px;
  width: 20px;
  border-bottom: 1px solid #fff;
  padding-bottom: 5px;
  overflow: visible;
`;
const TodayMessage = styled.h4`
  display: flex;
  color: #fff;
  z-index: 1;
  margin-top: 5px;
  font-weight: normal;
`;
