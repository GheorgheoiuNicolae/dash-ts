import * as React from 'react';
import { StateProps, DispatchProps, OwnProps } from './container';
import styled from 'styled-components';
// import { Any } from '../../types/';

export type Props = StateProps & OwnProps & DispatchProps;
interface State {
  isAdmin: boolean;
  dummyEntryNames: string[];
  dummyEntryDescriptions: string[];
  // dummyLabelNames: string[];
  // dummyLabelColors: string[];
}

export default class AdminTools extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      isAdmin: false,
      dummyEntryNames: [
        'Plane ticket to Barcelona',
        'Work Checkin',
        'Finished Dashmon app design',
        'Received salary',
        'Bought a new iPhone',
        'Personal finance calculations',
        'Released Everlist',
        'Pay Rent'
      ],
      dummyEntryDescriptions: [
        `Come on! he shouted to the others. "Be quick!" They all ran forward and passed under the tree without injury, 
        except Toto, who was caught by a small branch and shaken until he howled. But the Woodman 
        promptly chopped off the branch and set the little dog free.`,
        `The first case," said he. Then, putting his hand to his head, he exclaimed, "Heh! This is not my wig!`,
        `Let us make a chair with our hands and carry her," said the Scarecrow. So they picked up Toto and put the dog 
        in Dorothy's lap, and then they made a chair with their hands for the seat and their arms for the arms and 
        carried the sleeping girl between them through the flowers.`,
        `Because if you did not wear spectacles the brightness and glory of the Emerald City would blind you. 
        Even those who live in the City must wear spectacles night and day. They are all locked on, for Oz 
        so ordered it when the City was first built, and I have the only key that will unlock them.`
      ],
      // dummyLabelNames: [
      //   'Finance',
      //   'Travel',
      //   'Work',
      //   'Family time',
      //   'Spendings',
      // ],
      // dummyLabelColors: [
      //   'coral',
      //   'cornflowerblue',
      //   'orange',
      //   'crimson',
      // ],
    };
  }

  componentWillMount() {
    const { user } = this.props;
    if(user.email === 'accounts@gheorgheoiu.com') {
      this.setState({
        isAdmin: true,
      });
    }
  }

  makeRandom(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  createDummyEntry() {
    const { dummyEntryNames, dummyEntryDescriptions } = this.state;
    const entry = {
      title: dummyEntryNames[this.makeRandom(0, 7)],
      description: dummyEntryDescriptions[this.makeRandom(0, 3)],
      date: new Date(2017, 
      new Date().getMonth(), this.makeRandom(0, 28), 
      this.makeRandom(0, 24), this.makeRandom(0, 59)).getTime(),
      createdAt: new Date(2017, 
      new Date().getMonth(), this.makeRandom(0, 28), 
      this.makeRandom(0, 24), this.makeRandom(0, 59)).getTime(),
      labels: [this.makeRandom(0, 24), this.makeRandom(0, 24)],
      photos: [],
      checklistItems: [],
      geoPlace: {
        lat: '',
        long: '',
      },
      kind: 'regular',
    };
    return entry;
  }

  generateEntries(nr: number) {
    const { saveEntry, user } = this.props;
    for(let i = 0; i < nr; i++) {
      let entry = this.createDummyEntry();
      
      saveEntry(entry, user.uid);
    }
  }

  render() {
    const { isAdmin } = this.state;
    return isAdmin ? (
      <Wrap>
        <h3>Admin tools</h3>
        <button onClick={() => this.generateEntries(10)}>generate entries</button>
      </Wrap>
    ) : null;
  }
}

const Wrap = styled.div`
  position: absolute;
  top: 0px;
  right: 120px;
  z-index: 9;
  background: aquamarine;
  padding: 30px;
`;