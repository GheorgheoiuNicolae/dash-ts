import * as React from 'react';
import * as moment from 'moment';
import { InjectedRouter } from 'react-router';
import styled from 'styled-components';
import ConfirmRemoveEntryDialog from '../../Entries/EntryListItem/confirmRemove';
import { Link } from 'react-router';

var FontAwesome = require('react-fontawesome');
import './EntryListItem.css';

interface Props {
  entry: any;
  user: any;
  removeEntry: Function;
  labels: any;
  opacity?: any;
}
interface StateProps {
  router: InjectedRouter;
}

export default class EntryListItem extends React.Component<Props, StateProps> {
  removeEntry() {
    const { user, entry, removeEntry } = this.props;
    removeEntry(entry, user.uid);
  }
 
  render() {
    const { entry, user, labels, opacity } = this.props;
    const { photos, geoPlace, description, repeatEvery, checklistItems } = entry;
    const isInThePast = new Date(entry.dateTime).getTime() < new Date().getTime();
    
    return (
      <Wrapper 
        className={`entry-list-item`} 
        style={{opacity: opacity ? Number(opacity) : 1}}
        id={entry.id}
      >
        <Time onClick={() => console.log('entry', entry)} >
          { 
            isInThePast 
            ? moment(new Date(entry.dateTime)).format('DD/MM')
            : moment(new Date(entry.dateTime)).format('hh:mm')
          }
          
        </Time>

        <StyledRouterLink to={`/entries/${entry.id}`}>
          <ButtonText className="button-text">
            {entry.title}
          </ButtonText>
        </StyledRouterLink>

        <EntryLabels className="labels">
          {entry.labels && entry.labels.map((label: any, index: number) => {
            return (<EntryLabel key={index}>
            <Circle style={{background: labels[label] && labels[label].color}} />
            <LabelName>{labels[label] && labels[label].name}</LabelName>
          </EntryLabel>);
          })}
        </EntryLabels>

        <EntryIcons className="entryIcons">
          {description && <FontAwesome
            name="align-left"
          />}
          {geoPlace && geoPlace.lat && <FontAwesome
            name="map-marker"
          />}
          {photos && photos.length && <FontAwesome
            name="camera"
          />}
          {checklistItems && <FontAwesome
            name="list-ol"
          />}
          {repeatEvery && <FontAwesome
            name="repeat"
          />}

        </EntryIcons>
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
  margin: 5px 0;
  height: 40px;
  position: relative;
  box-shadow: 0 1px 8px rgba(0,0,0,.1);
  transition: translate .18s,box-shadow .18s, opacity .2s;
  overflow: hidden;
  &:hover {
    opacity: 1!important;
  }
`;

const Time = styled.p`
  right: 0;
  top: -28px;
  font-size: 11px;
  margin-left: 20px;
  font-weight: 600;
  display: block;
  padding: 12px;
  margin: 0;
  background: #ececec;
`;

const EntryIcons = styled.div`
  color: #333;
  border-left: 1px solid #F5F5F5;
`;
const EntryLabels = styled.div`
  display: flex;
`;
const EntryLabel = styled.div`
  display: flex;
  padding: 0 5px;
  align-items: center;
`;
const Circle = styled.div`
  display: block;
  width: 10px;
  height: 10px;
  margin: 0px 5px;
  border-radius: 100%;
`;
const LabelName = styled.div`
  font-size: 12px;
`;
const StyledRouterLink = styled(Link)`
  display:flex;
  flex: 1;
  color: #8ca4af;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
`;
const ButtonText = styled.span`
	display: flex;
  flex: 1;
  margin: 0 10px;
  color: #000;
  line-height: 16px;
`;