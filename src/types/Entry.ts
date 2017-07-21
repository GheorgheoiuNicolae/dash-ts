import { Any } from './index';

interface Entry {
  id: number;
  title: string;
  description: string; // should support markup at some point
  date: number | string; // date of the date where the entry appears on the list.
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
  repeatEvery?: number | null; 
}

interface ChecklistItem {
  completed: boolean;
  text: string; // text of the list item
  completedAt: string | null; // timestamp of when the entry was completed
  position: number | null; // bullet items should be movable in the list at some point
}

export default Entry;