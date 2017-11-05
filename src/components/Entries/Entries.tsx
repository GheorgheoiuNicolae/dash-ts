import * as React from 'react';
import * as moment from 'moment';
import { StateProps, DispatchProps, OwnProps } from './EntriesContainer';
import EntryListItem from './EntryListItem/EntryListItem';
import styled from 'styled-components';
import Header from '../dashboard/Header/';
import './entries.css';

export type Props = StateProps & OwnProps & DispatchProps;

export default class Entries extends React.Component<Props, {}> {
  public shouldComponentUpdate(nextProps: any, nextState: any) {
    return nextProps.numberOfEntries === this.props.numberOfEntries ? false : true;
  }

  componentDidMount() {
    this.setScrollToDate();
  }
  
  loadMore() {
    const { loadMoreEntries, user, datesLoaded, uiState } = this.props;
    const scrollDirection = uiState.scrollDirection;

    loadMoreEntries(user.uid, 
      scrollDirection === 'up' ? 'future' : 'past', 
      scrollDirection === 'up' ? datesLoaded.future : datesLoaded.past);
  }
  
  setScrollToDate() {
    const wrap  = document.getElementById('entries-page-wrap');
    setTimeout(() => {
      const todayEntry  = document.getElementById('scrollTarget');
      if( wrap && todayEntry ) {
        wrap.scrollTop = todayEntry.offsetTop;
      }
    }, 200);
  }
  
  detectScrollDirection(prev: number, next: number) {
    const { onListScroll } = this.props;
    if( prev < next ) {
      onListScroll({scrollDirection: 'down'});
    } else {
      onListScroll({scrollDirection: 'up'});
    }
  }

  handleScroll() {
    const { isLoading, uiState, onListScroll } = this.props;
    const wrap = document.getElementById('entries-page-wrap');
    
    if( wrap && !isLoading.loading ) {
      this.detectScrollDirection(uiState.entryListScrollFromTop, wrap.scrollTop);
      
      if( wrap.scrollTop === 0 && uiState.scrollDirection === 'up' ) {
        this.loadMore();
      }
      if(wrap.scrollTop + wrap.offsetHeight === wrap.scrollHeight) {
        this.loadMore();
      }
      
      onListScroll({entryListScrollFromTop: wrap.scrollTop});
    }
  }

  mapEntriesToDays = () => {
    const { entries, user, removeEntry, closestToToday, labelsById } = this.props;
    return (
      entries.map((day: any, index: any) => {
        let mappedEntries = day.entries.map( (entry: any) => {
          return (
            <EntryListItem 
              user={user} 
              entry={entry} 
              key={entry.id}
              removeEntry={removeEntry}
              labels={labelsById}
            />
          );
        });
        return (
          <div key={index} id={`${closestToToday.date === day.date.getTime() ? 'scrollTarget' : ''}`}>
            <Date>{moment(day.date).format('dddd, D')} {moment(day.date).format('MMMM YYYY')}</Date>
            {mappedEntries}
          </div>
        );
      })
    );
  }

  render() {
    const { entries, view, isLoading } = this.props;
    console.log('rerender');
    
    return (
      <Wrap id="entries-page-wrap" onScroll={() => this.handleScroll()} >
        <Header />
        <EntryList className={`view-boxes ${view}`}>
          
          <div 
            className={`${isLoading.loading && isLoading.type === 'initial' 
              ? 'entries-loader showed' 
              : 'entries-loader hidden' }`}
          >
            Loading...
          </div>

          <TimelineBar />
          {entries && this.mapEntriesToDays()}
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
  position: relative;
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
  position: fixed;
  width: 7px;
  height: 100%;
  background: #fff;
  left: 264px;
`;

const Date = styled.p`
  margin-left: 50px;
`;