import * as React from 'react';
import * as moment from 'moment';
import { StateProps, DispatchProps, OwnProps } from './EntriesContainer';
import EntryListItem from './EntryListItem/EntryListItem';
import styled from 'styled-components';
import Header from '../dashboard/Header/';
import Filters from '../Filters/';
import EntryDetails from './EntryListItem/EntryDetails/';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TargetIcon from 'material-ui/svg-icons/device/gps-fixed';

import './entries.css';
import './loader.css';

export type Props = StateProps & OwnProps & DispatchProps;
interface ComponentProps {
  firstScrollRequest: boolean; 
  shouldAutoScroll: boolean;
}

export default class Entries extends React.PureComponent<Props, ComponentProps> {
  constructor() {
    super();
    this.state = {
      firstScrollRequest: true,
      shouldAutoScroll: true,
    };
  }

  // public shouldComponentUpdate(nextProps: any, nextState: any) {
  //   // Consider here updating after edited entry

  //   return nextProps.numberOfEntries === this.props.numberOfEntries ? false : true;
  // }

  loadMore() {
    const { loadMoreEntries, user, datesLoaded, uiState } = this.props;
    const { firstScrollRequest } = this.state;
    const scrollDirection = uiState.scrollDirection;

    this.setState({firstScrollRequest: false});
    
    if(firstScrollRequest === false) {
      loadMoreEntries(user.uid, 
        scrollDirection === 'up' ? 'future' : 'past', 
        scrollDirection === 'up' ? datesLoaded.future : datesLoaded.past);
    }
  }
  
  setScrollToDate() {
    const wrap  = document.getElementById('entries-page-wrap');
    setTimeout(() => {
      const todayEntry  = document.getElementById('scrollTarget');
      if( wrap && todayEntry ) {
        wrap.scrollTop = todayEntry.offsetTop;
        this.setState({shouldAutoScroll: false});
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
    const { entries, user, removeEntry, 
      labelsById, currentDay, selectEntry, 
      showFiltered, filteredEntries,
      deselectEntry } = this.props;
    const { firstScrollRequest, shouldAutoScroll } = this.state;
    
    const entriesToMap = showFiltered ? filteredEntries : entries;
    
    return (
      entriesToMap.map((day: any, index: any) => {
        let mappedEntries = day.entries.map( (entry: any) => {
          return (
            <EntryListItem 
              user={user} 
              entry={entry} 
              key={entry.id}
              labels={labelsById}
              removeEntry={removeEntry}
              selectEntry={selectEntry}
              deselectEntry={deselectEntry}
            />
          );
        });
        if ( currentDay === day.date.getTime() && firstScrollRequest && shouldAutoScroll) {
          this.setScrollToDate();
        }
        return (
          <Day key={day.date} id={`${currentDay === day.date.getTime() && 'scrollTarget'}`}>
            <Date>{moment(day.date).format('dddd, D')} {moment(day.date).format('MMMM YYYY')}</Date>
            {mappedEntries}
          </Day>
        );
      })
    );
  }

  render() {
    const { entries, view, isLoading, selectedEntry } = this.props;
    const shouldDisplayLoader = isLoading.loading && isLoading.type === 'initial';

    return (
      <Wrap id="entries-page-wrap" onScroll={() => this.handleScroll()} >
        <Header />
        <Filters />
        <EntryDetails />

        {!selectedEntry &&
          <StyledFloatingActionButton onClick={() => this.setScrollToDate()} >
            <TargetIcon />
          </StyledFloatingActionButton>
        }

        <EntryList className={`view-boxes ${view}`}>
          <div className={`loader-wrapper ${shouldDisplayLoader ? 'loader-shown' : 'loader-hidden' }`}>
            <div className="loader">
              <div className="item item-1" />
              <div className="item item-2" />
              <div className="item item-3" />
              <div className="item item-4" />
            </div>
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
  padding: 0 0 0 200px;
`;

const StyledFloatingActionButton = styled(FloatingActionButton)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9;
`;

const Day = styled.div`
  padding: 0 30px;
`;

const TimelineBar = styled.div`
  position: fixed;
  width: 7px;
  height: 100%;
  background: #fff;
  left: 264px;
  padding: 0;
`;

const Date = styled.p`
  margin-left: 50px;
  color: #607d8b;
  font-weight: bold;
`;