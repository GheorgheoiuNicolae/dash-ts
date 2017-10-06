import * as React from 'react';
import * as moment from 'moment';
import { StateProps, DispatchProps, OwnProps } from './EntriesContainer';
import EntryListItem from './EntryListItem/EntryListItem';
import styled from 'styled-components';
import Header from '../dashboard/Header/';

export type Props = StateProps & OwnProps & DispatchProps;
interface OtherProps {
  pixelsFromTop: number;
  scrollDirection: string;
}

export default class Entries extends React.Component<Props, OtherProps> {
  componentWillMount() {
    this.setState({pixelsFromTop: 0, scrollDirection: ''});
  }

  componentDidMount() {
    this.setScrollToDate();
  }

  loadMore() {
    const { loadMoreEntries, user, datesLoaded } = this.props;
    const { scrollDirection } = this.state;
    loadMoreEntries(user.uid, 
      scrollDirection === 'up' ? 'future' : 'past', 
      scrollDirection === 'up' ? datesLoaded.future : datesLoaded.past);
  }
  
  setScrollToDate() {
    const wrap  = document.getElementById('entries-page-wrap');
    setTimeout(() => {
      const todayEntry  = document.getElementById('scrollTarget');
      if( wrap && todayEntry ) {
        console.log('found scroll target: ', wrap.scrollTop);
        wrap.scrollTop = todayEntry.offsetTop;
      }
    }, 200);
  }
  
  detectScrollDirection(prev: number, next: number) {
    if( prev < next ) {
      return this.setState({scrollDirection: 'down'});
    } else {
      return this.setState({scrollDirection: 'up'});
    }
  }

  handleScroll() {
    const { isLoading } = this.props;
    const wrap  = document.getElementById('entries-page-wrap');
    
    if( wrap && !isLoading ) {
      this.detectScrollDirection(this.state.pixelsFromTop, wrap.scrollTop);
      console.log('wrap.scrollTop: ', wrap.scrollTop);
      console.log('wrap.offsetHeight: ', wrap.offsetHeight);
      console.log('wrap.scrollHeight: ', wrap.scrollHeight);
      
      if( wrap.scrollTop === 0 && this.state.scrollDirection === 'up' ) {
        console.log('load more UP');
        this.loadMore();
      }
      if(wrap.scrollTop + wrap.offsetHeight === wrap.scrollHeight) {
        console.log('reached bottom');
        this.loadMore();
      }
      
      this.setState({pixelsFromTop: wrap.scrollTop});
    }
  }

  render() {
    const { entries, user, removeEntry, view, closestToToday } = this.props;
    let mappedDays = entries.map((day: any, index) => {
      let mappedEntries = day.entries.map( (entry: any) => {
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
        <div key={index} id={`${closestToToday.date === day.date.getTime() ? 'scrollTarget' : ''}`}>
          <Date>{moment(day.date).format('dddd, D')} {moment(day.date).format('MMMM YYYY')}</Date>
          {mappedEntries}
        </div>
      );
    });
    
    return (
      <Wrap id="entries-page-wrap"  onScroll={() => this.handleScroll()} >
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