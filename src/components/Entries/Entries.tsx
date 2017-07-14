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
  componentWillMount() {
    const { getEntries, user } = this.props;
    if(user) {
      getEntries(user.uid);
    }
  }

  render() {
    const { entries } = this.props;
    let mappedDays = entries.map((day: Any, index) => {
      let mappedEntries = day.entries.map( (entry: Any) => {
        return <EntryListItem entry={entry} key={entry.id} />;
      });
      return (
        <div key={index}>
          <p>{moment(day.date).format('dddd, D')} {moment(day.date).format('MMMM YYYY')}</p>
          {mappedEntries}
        </div>
      );
    });
    
    return (
      <Wrap>
        <EntryList>
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
  margin-top: 50px;
  max-width: 800px;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: scroll;
`;