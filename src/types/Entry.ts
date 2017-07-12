import { Any } from './index';

interface Entry {
  id: number;
  title: string;
  description: string; // should support markup at some point
  date: number; // timestamp of the date where the entry appears on the list.
  createdAt: number;
  // array of label ids
  // if I delete a label, will it be deleted from the entry?
  labels: number[] | null; 
  photos: Any[] | null;
  checklistItems: ChecklistItem[] | null;
  geoPlace: { // if the entry has a place assigned. else we can populate with the users location?
    lat: string;
    long: string;
  } | null;
  kind?: 'regular'  | 'reccurent'; // possibly one way to make reccurent entries
}

interface ChecklistItem {
  completed: boolean;
  text: string; // text of the list item
  completedAt: string | null; // timestamp of when the entry was completed
  position: number | null; // bullet items should be movable in the list at some point
}

// const entrySample: Entry = {
//   id: 319,
//   title: 'Go to Malaga',
//   description: 'and have some time off',
//   checklistItems: [{
//     completed: false,
//     text: 'Buy keychain',
//     completedAt: null,
//     position: 1,
//   }],
//   date: '12352353532',
//   createdAt: '29483252032',
//   labels: [44, 92],
//   photos: [],
//   geoPlace: {
//     lat: '29.5282',
//     lang: '44,218',
//   },
//   kind: 'regular',
// };
// console.log('entrySample', entrySample);

export default Entry;