import * as React from 'react';
import * as moment from 'moment';
import { InjectedRouter } from 'react-router';
import styled from 'styled-components';
import ConfirmRemoveEntryDialog from './confirmRemove';
// import { Link } sfrom 'react-router';

var FontAwesome = require('react-fontawesome');
import './EntryListItem.css';

interface Props {
  entry: any;
  user: any;
  removeEntry: Function;
  selectEntry: Function;
  deselectEntry: Function;
  labels: any;
}
interface StateProps {
  router: InjectedRouter;
}

export default class EntryListItem extends React.PureComponent<Props, StateProps> {
  removeEntry() {
    const { user, entry, removeEntry } = this.props;
    removeEntry(user.uid, entry, 0, []);
  }

  selectEntry() {
    const { selectEntry, entry } = this.props;
    selectEntry(entry.id);
  }

  render() {
    const { entry, user, labels } = this.props;
    const { photos, geoPlace, description, repeatEvery, checklistItems, id } = entry;
    return (
      <Wrapper 
        className={`entry-list-item ${id === 'injectedEntry' && 'injectedEntry'}`} 
        id={entry.id}
      >
        {id !== 'injectedEntry' && (
          <Time onClick={() => this.selectEntry()} > {moment(new Date(entry.dateTime)).format('hh:mm')} </Time>
        )}
        
        {id === 'injectedEntry' && 
          <MainLabel className="icon icon-warn">
            <FontAwesome
              name="smile-o"
            /> 
          </MainLabel>
        }
        {!description && 
          !photos && 
          !repeatEvery && 
          !checklistItems &&
          id !== 'injectedEntry' &&
          <MainLabel className="icon icon-regular">
            <FontAwesome
              name="circle-o"
            /> 
          </MainLabel>
        }
        {description && 
          !photos && 
          !repeatEvery && 
          !checklistItems &&
        <MainLabel className="icon icon-content">
          <FontAwesome
            name="align-left"
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
        
        {id !== 'injectedEntry' 
        ? (<NoLink onClick={() => this.selectEntry()}>
          <ButtonText className="button-text">
            {entry.title}
          </ButtonText>
        </NoLink>)
        : (<NoLink>
          <ButtonText className="button-text">
            {entry.title}
          </ButtonText>
        </NoLink>)
        }

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
          {geoPlace && geoPlace.latitude && <FontAwesome
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
  color: #616161;
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
// const StyledRouterLink = styled(Link)`
//   display:flex;
//   flex: 1;
//   color: #8ca4af;
//   text-decoration: none;
//   justify-content: center;
//   align-items: center;
// `;
const NoLink = styled.p`
  display:flex;
  flex: 1;
  color: #8ca4af;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const ButtonText = styled.span`
	display: flex;
  flex: 1;
  margin: 0 10px;
`;