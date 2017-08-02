import * as React from 'react';
import * as moment from 'moment';
import { InjectedRouter } from 'react-router';
import { Any } from '../../../types';
import styled from 'styled-components';
import ConfirmRemoveEntryDialog from './confirmRemove';
import { Link } from 'react-router';

var FontAwesome = require('react-fontawesome');
import './EntryListItem.css';

interface Props {
  entry: Any;
  user: Any;
  removeEntry: Function;
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
    const { entry, user } = this.props;
    const { photos, geoPlace, description, repeatEvery, checklistItems } = entry;
    return (
      <Wrapper className="entry-list-item" id={entry.id}>
        <Time onClick={() => console.log('entry', entry)} > {moment(new Date(entry.date)).format('hh:mm')} </Time>
        {description && 
          !photos && 
          geoPlace &&
          !geoPlace.lat && 
          !repeatEvery && 
          !checklistItems &&
        <MainLabel className="icon icon-content">
          <FontAwesome
            name="align-left"
          />
        </MainLabel>}
        {geoPlace && geoPlace.lat && !checklistItems && <MainLabel className="icon icon-map">
          <FontAwesome
            name="map-marker"
          />
        </MainLabel>}
        {photos && photos.length && !checklistItems && !repeatEvery && 
        <MainLabel className="icon icon-photo">
          <FontAwesome
            name="camera"
          />
        </MainLabel>}
        {checklistItems && checklistItems.length && !repeatEvery && <MainLabel className="icon icon-list">
          <FontAwesome
            name="list-ol"
          />
        </MainLabel>}
        {repeatEvery && <MainLabel className="icon icon-repeat">
          <FontAwesome
            name="repeat"
          />
        </MainLabel>}

        <StyledRouterLink to={`/entries/${entry.id}`}>
          <ButtonText className="button-text">
            {entry.title}
          </ButtonText>
        </StyledRouterLink>

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
  margin: 20px 0;
  height: 50px;
  position: relative;
  box-shadow: 0 1px 8px rgba(0,0,0,.1);
  transition: translate .18s,box-shadow .18s;
`;

const Time = styled.p`
  position: absolute;
  right: 0;
  top: -28px;
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
  margin: 0 10px 0 20px;
  width: 35px;
  height: 35px;
  justify-content: center;
  color: #fff;
`;
const EntryIcons = styled.div`
  color: #333;
  border-left: 1px solid #F5F5F5;
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
`;