// import { ApplicationState } from '../../reducers';
import { Entry } from '../../types/';

const getAllEntries = (state: any): Entry[] => {
  console.log('state: ', state);
  return state.entries.allIds.map((id: string) => state.entries.byId[id]);
  // return state;
};

export {
  getAllEntries,
};